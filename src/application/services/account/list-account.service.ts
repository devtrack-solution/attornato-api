import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { ListAccountInboundPort } from '@/domain/account/ports/inbound/list-account.inbound-port'
import { AccountType } from '@/domain/account/types/account.type'

@Injectable()
export class ListAccountService implements ListAccountInboundPort {
  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<AccountType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = ['accountPerson']
    const searchFields: string[] = ['accountPerson.name', 'createdAt']
    // const filters = {
    //   createdAt_from: '2025-05-20',
    // }
    const order = { createdAt: 'ASC' }
    let result = await this.accountRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let account = result.data.map((account) => account as AccountType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: account,
    }
  }
}
