import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDTO } from './dtos/signup.dto'
import { SignInDTO } from './dtos/signin.dto'
import { Response } from 'express'
import { RefreshTokenGuard } from 'src/guards/RefreshTokenGuard.guard'
import { AccessTokenGuard } from 'src/guards/AccessTokenGuard.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpData: SignUpDTO, @Res() response: Response) {
    return await this.authService.signUp(signUpData, response)
  }

  @Post('/sign-in')
  async signIn(@Body() signInData: SignInDTO, @Res() response: Response) {
    return await this.authService.signIn(signInData, response)
  }

  @Get('/refresh-token')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Req() request: RequestWithCookies,
    @Res() response: Response,
  ) {
    const tokenId = request.id

    return await this.authService.refreshToken(tokenId, response)
  }

  @Get('/validate-token')
  @UseGuards(AccessTokenGuard)
  validateToken(@Res() response: Response) {
    return this.authService.validateAccessToken(response)
  }

  @Get('/logout')
  logout(@Res() response: Response) {
    return this.authService.logout(response)
  }
}
