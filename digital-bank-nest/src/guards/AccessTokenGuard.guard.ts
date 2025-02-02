import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common'
import { JsonWebTokenError, JwtService } from '@nestjs/jwt'
import { internalServerError } from 'messages/errors/generic'
import { accessTokenMissing, invalidAccessToken } from 'messages/errors/tokens'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest<RequestWithCookies>()
      const accessToken = request.cookies['accessToken']

      if (!accessToken) {
        throw new UnauthorizedException(accessTokenMissing)
      }

      const payload: JwtPayload = this.jwtService.verify(accessToken)

      if (!payload) {
        throw new UnauthorizedException(invalidAccessToken)
      }

      request.id = payload.id
      return true
    } catch (error: unknown) {
      console.error('error in AccessTokenGuard: ', error)

      if (error instanceof JsonWebTokenError || error instanceof SyntaxError) {
        throw new UnauthorizedException(invalidAccessToken)
      }

      if (error instanceof HttpException) {
        throw new UnauthorizedException(accessTokenMissing)
      }

      throw new InternalServerErrorException(internalServerError)
    }
  }
}
