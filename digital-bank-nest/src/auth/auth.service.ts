import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { SignUpDTO } from './dtos/signup.dto'
import * as bcrypt from 'bcrypt'
import { HttpStatus } from '@nestjs/common'
import { SignInDTO } from './dtos/signin.dto'
import { unauthorizedException } from 'messages/errors/unauthorized'
import { JsonWebTokenError, JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpData: SignUpDTO, response: Response) {
    const emailAlreadyExists = await this.userRepository.findOne({
      where: { email: signUpData.email },
    })

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already in use')
    }

    const hashedPassword = bcrypt.hashSync(signUpData.password, 12)

    const user = this.userRepository.create({
      ...signUpData,
      password: hashedPassword,
    })

    await this.userRepository.save(user)

    return response.status(HttpStatus.CREATED).json({
      message: 'User created successfully',
    })
  }

  async signIn(signInData: SignInDTO, response: Response) {
    const user = await this.userRepository.findOne({
      where: { email: signInData.email },
    })

    if (!user) {
      throw new UnauthorizedException(unauthorizedException)
    }

    const passwordMatch = bcrypt.compareSync(signInData.password, user.password)

    if (!passwordMatch) {
      throw new UnauthorizedException(unauthorizedException)
    }

    return this.generateUserTokens(user.email, user.id, response)
  }

  async refreshToken(request: RequestWithCookies, response: Response) {
    try {
      const refreshToken = request.cookies['refreshToken']

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token is missing')
      }

      const payload: JwtPayload =
        await this.jwtService.verifyAsync(refreshToken)

      if (!payload) {
        throw new UnauthorizedException('Invalid refresh token')
      }

      const accessToken = this.jwtService.sign({ id: payload.id })

      response.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      })

      return response.status(HttpStatus.OK).json({
        message: 'Token refreshed successfully',
      })
    } catch (error) {
      console.error(error)

      if (error instanceof UnauthorizedException) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: error.message })
      }

      if (
        error instanceof JsonWebTokenError &&
        error.message === 'jwt malformed'
      ) {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          message: 'The provided refresh token is malformed.',
        })
      }

      if (error instanceof Error) {
        if (error.name === 'JsonWebTokenError') {
          console.error('Access token validation error:', error.message)
          return response.status(HttpStatus.UNAUTHORIZED).json({
            message: error.message,
          })
        }

        console.error('Refresh token expired:', error.message)
        return response.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message,
        })
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unexpected error occurred',
      })
    }
  }

  async validateAccessToken(accessToken: string, response: Response) {
    try {
      if (!accessToken) {
        throw new UnauthorizedException('Access token is missing')
      }

      const payload: JwtPayload = await this.jwtService.verifyAsync(accessToken)

      if (!payload) {
        throw new UnauthorizedException('Invalid access token')
      }

      return response.status(HttpStatus.OK).json({
        message: 'Successfully validated',
      })
    } catch (error) {
      console.error(error)

      if (error instanceof UnauthorizedException) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: error.message })
      }

      if (
        error instanceof JsonWebTokenError &&
        error.message === 'jwt malformed'
      ) {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          message: 'The provided refresh token is malformed.',
        })
      }

      if (error instanceof Error) {
        if (error.name === 'JsonWebTokenError') {
          return response.status(HttpStatus.UNAUTHORIZED).json({
            message: error.message,
          })
        }

        return response.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message,
        })
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unexpected error occurred',
      })
    }
  }

  logout(response: Response) {
    response.cookie('accessToken', '', { maxAge: 0 })
    response.cookie('refreshToken', '', { maxAge: 0 })

    return response.status(HttpStatus.OK).json({
      message: 'user logged out successfully',
    })
  }

  generateUserTokens(email: string, id: string, response: Response) {
    const accessToken = this.jwtService.sign({ email, id })
    const refreshToken = this.jwtService.sign({ id })

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    })

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    })

    return response.status(HttpStatus.OK).json({
      message: 'Login Success',
    })
  }
}
