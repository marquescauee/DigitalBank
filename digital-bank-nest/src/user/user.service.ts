import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { accessTokenMissing, invalidAccessToken } from 'messages/errors/tokens'
import { User } from 'src/auth/entities/user.entity'
import { Repository } from 'typeorm'
import {
  handleHttpError,
  handleJwtError,
  handleDefaultError,
} from 'utils/handleRequestErrors'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUser(accessToken: string, response: Response) {
    try {
      if (!accessToken) {
        throw new UnauthorizedException(accessTokenMissing)
      }

      const { id } = this.jwtService.decode<User>(accessToken)

      const user = await this.userRepository.findOne({
        where: { id },
      })

      if (!user) {
        throw new BadRequestException(invalidAccessToken)
      }

      return response.status(HttpStatus.OK).json(user)
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
}
