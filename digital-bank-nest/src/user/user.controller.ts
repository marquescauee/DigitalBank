import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { Response } from 'express'
import { AccessTokenGuard } from 'src/guards/AccessTokenGuard.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getUser(@Req() request: RequestWithCookies, @Res() response: Response) {
    const tokenId = request.id

    return await this.userService.getUser(tokenId, response)
  }
}
