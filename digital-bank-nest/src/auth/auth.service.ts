import {
  BadRequestException,
  HttpException,
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

import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import {
  handleDefaultError,
  handleHttpError,
  handleJwtError,
} from 'utils/handleRequestErrors'
import { emailAlreadyInUse, wrongCredentials } from 'messages/errors/auth'
import {
  userCreatedSuccessfully,
  tokenRefreshedSuccessfully,
  tokenValidatedSuccesfully,
  logoutSuccess,
  loginSuccess,
} from 'messages/success/auth'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpData: SignUpDTO, response: Response) {
    try {
      const emailAlreadyExists = await this.userRepository.findOne({
        where: { email: signUpData.email },
      })

      if (emailAlreadyExists) {
        throw new BadRequestException(emailAlreadyInUse)
      }

      const hashedPassword = await bcrypt.hash(signUpData.password, 12)

      const user = this.userRepository.create({
        ...signUpData,
        password: hashedPassword,
      })

      await this.userRepository.save(user)

      return response.status(HttpStatus.CREATED).json({
        message: userCreatedSuccessfully,
      })
    } catch (error) {
      if (error instanceof HttpException) {
        return handleHttpError(error, response)
      }

      return handleDefaultError(response)
    }
  }

  async signIn(signInData: SignInDTO, response: Response) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: signInData.email },
      })

      if (!user) {
        throw new UnauthorizedException(wrongCredentials)
      }

      const passwordMatch = await bcrypt.compare(
        signInData.password,
        user.password,
      )

      if (!passwordMatch) {
        throw new UnauthorizedException(wrongCredentials)
      }

      return this.generateUserTokens(user.id, response)
    } catch (error) {
      if (error instanceof HttpException) {
        return handleHttpError(error, response)
      }

      return handleDefaultError(response)
    }
  }

  async refreshToken(tokenId: string, response: Response) {
    try {
      const accessToken = await this.jwtService.signAsync(
        { id: tokenId },
        { expiresIn: '15m' },
      )

      response.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      })

      return response.status(HttpStatus.OK).json({
        message: tokenRefreshedSuccessfully,
      })
    } catch (error) {
      if (error instanceof HttpException) {
        return handleHttpError(error, response)
      }

      if (error instanceof Error) {
        return handleJwtError(error, response)
      }

      return handleDefaultError(response)
    }
  }

  validateAccessToken(response: Response) {
    return response.status(HttpStatus.OK).json({
      message: tokenValidatedSuccesfully,
    })
  }

  logout(response: Response) {
    response.cookie('accessToken', '', { maxAge: 0 })
    response.cookie('refreshToken', '', { maxAge: 0 })

    return response.status(HttpStatus.OK).json({
      message: logoutSuccess,
    })
  }

  generateUserTokens(id: string, response: Response) {
    const accessToken = this.jwtService.sign({ id }, { expiresIn: '15m' })
    const refreshToken = this.jwtService.sign({ id }, { expiresIn: '1d' })

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
      message: loginSuccess,
    })
  }
}
