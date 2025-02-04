import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { userNotFound } from 'messages/errors/user'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { handleHttpError, handleDefaultError } from 'utils/handleRequestErrors'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(tokenId: string, response: Response) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: tokenId },
      })

      if (!user) {
        throw new BadRequestException(userNotFound)
      }

      return response.status(HttpStatus.OK).json(user)
    } catch (error) {
      if (error instanceof HttpException) {
        return handleHttpError(error, response)
      }

      return handleDefaultError(response)
    }
  }
}
