import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { ListToSelectAccountInboundPort } from '@/domain/account/ports/inbound/list-to-select-account.inbound-port'
import { AccountType } from '@/domain/account/types/account.type'
import { Account } from '@/domain/account/business-objects/account.bo'

@Injectable()
export class ListToSelectAccountService implements ListToSelectAccountInboundPort {
  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<AccountType.Output[]>> {
    const select: string[] = ['id', 'accountPerson.name']
    const searchFields: string[] = ['accountPerson.name']
    const order = { name: 'ASC' }
    let account = await this.accountRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return account.map((account) => new Account(account as AccountType.Output).toJson())
  }
}
