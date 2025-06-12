import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { ListAccountInboundPort } from '@/domain/account/ports/inbound/list-account.inbound-port'
import { AccountType } from '@/domain/account/types/account.type'
import { deepOmit } from '@/core/utils/deep-omit'

@Injectable()
export class ListAccountService implements ListAccountInboundPort {
  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<AccountType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = ['accountPerson', 'credential.roles']
    const searchFields: string[] = ['accountPerson.name']
    const order = { 'accountPerson.name': 'ASC' }

    let result = await this.accountRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    const account = result.data.map((account) =>
      deepOmit(account, [
        'password',
        'isActive',
        'lastLogin',
        'passwordHash',
        'requestNewPassword',
        'expiredAt',
        'expiredCodeAt',
        'resetPasswordToken',
        'resetPasswordCode',
        'createdAt',
        'lastUpdatedByUser',
        'createdByUser',
        'previousEnable',
        'deletedAt',
        'updatedAt',
      ]),
    )
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: account,
    }
  }
}
