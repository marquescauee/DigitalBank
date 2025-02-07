import { Injectable } from '@nestjs/common'
import { Account } from './account.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Response } from 'express'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async getAccount() {
    return this.accountRepository.count()
  }

  async getUserAccounts(request: RequestWithCookies, response: Response) {
    const { id } = request

    const userAccounts = await this.accountRepository.find({
      where: { user: { id } },
    })

    return response.status(200).json(userAccounts)
  }
}
