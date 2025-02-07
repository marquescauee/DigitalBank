import { Controller, Get, Req, Res } from '@nestjs/common'
import { AccountService } from './account.service'
import { Response } from 'express'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAccount() {
    return await this.accountService.getAccount()
  }

  @Get('/user-accounts')
  async getUserAccounts(
    @Req() request: RequestWithCookies,
    @Res() response: Response,
  ) {
    return await this.accountService.getUserAccounts(request, response)
  }
}
