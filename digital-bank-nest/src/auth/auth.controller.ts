/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDTO } from './dtos/signup.dto'
import { SignInDTO } from './dtos/signin.dto'
import { Response, Request } from 'express'

@Controller('/api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpData: SignUpDTO) {
    return this.authService.signUp(signUpData)
  }

  @Post('/sign-in')
  async signIn(@Body() signInData: SignInDTO, @Res() response: Response) {
    return await this.authService.signIn(signInData, response)
  }

  @Post('/refresh-token')
  async refreshToken(
    @Req() request: RequestWithCookies,
    @Res() response: Response,
  ) {
    return this.authService.refreshToken(request, response)
  }

  @Post('/validate-token')
  async validateToken(@Req() request: Request, @Res() response: Response) {
    return this.authService.validateAccessToken(
      request.cookies.accessToken,
      response,
    )
  }

  @Post('/logout')
  logout(@Res() response: Response) {
    return this.authService.logout(response)
  }
}
