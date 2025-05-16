import { Inject, Injectable } from '@nestjs/common'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { CreateAccountInboundPort } from '@/domain/account/ports/inbound/create-account.inbound-port'
import { AccountType } from '@/domain/account/types/account.type'
import { Account } from '@/domain/account/business-objects/account.bo'

@Injectable()
export class CreateAccountService implements CreateAccountInboundPort {
  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
  ) {}

  async execute(data: AccountType.Input): Promise<AccountType.Output> {
    let county = new Account(data)
    await this.accountRepository.saveObject(county.toPersistence())
    return county.toJson()
  }
}
