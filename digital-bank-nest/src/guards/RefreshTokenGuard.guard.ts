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
import {
  refreshTokenMissing,
  invalidRefreshToken,
} from 'messages/errors/tokens'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest<RequestWithCookies>()
      const refreshToken = request.cookies['refreshToken']

      if (!refreshToken) {
        throw new UnauthorizedException(refreshTokenMissing)
      }

      const payload: JwtPayload = this.jwtService.verify(refreshToken)

      if (!payload) {
        throw new UnauthorizedException(invalidRefreshToken)
      }

      request.id = payload.id
      return true
    } catch (error: unknown) {
      console.error('error in RefreshTokenGuard: ', error)

      if (error instanceof JsonWebTokenError || error instanceof SyntaxError) {
        throw new UnauthorizedException(invalidRefreshToken)
      }

      if (error instanceof HttpException) {
        throw new UnauthorizedException(refreshTokenMissing)
      }

      throw new InternalServerErrorException(internalServerError)
    }
  }
}
