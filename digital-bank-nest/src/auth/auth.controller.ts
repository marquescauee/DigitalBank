import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDTO } from './dtos/signup.dto'
import { SignInDTO } from './dtos/signin.dto'
import { Response } from 'express'

@Controller()
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

  @Post('/refresh-user')
  async refreshUser(
    @Req() request: RequestWithCookies,
    @Res() response: Response,
  ) {
    return this.authService.refreshUser(request, response)
  }

  @Post('/logout')
  logout(@Res() response: Response) {
    return this.authService.logout(response)
  }
}
