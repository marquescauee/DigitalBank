import { Controller, Get, Req, Res } from '@nestjs/common'
import { UserService } from './user.service'
import { Response } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Req() request: RequestWithCookies, @Res() response: Response) {
    const accessToken = request.cookies['accessToken']

    return this.userService.getUser(accessToken, response)
  }
}
