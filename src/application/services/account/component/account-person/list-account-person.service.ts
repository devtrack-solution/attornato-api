import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountPersonRepositoryOutboundPort, AccountPersonRepositoryOutboundPortSymbol } from '@/domain/account/component/account-person/ports/outbound/account-person-repository.outbound-port'
import { Inject, Injectable } from '@nestjs/common'
import { ListAccountPersonInboundPort } from '@/domain/account/component/account-person/ports/inbound/list-account-person.inbound-port'

@Injectable()
export class ListAccountPersonService implements ListAccountPersonInboundPort {
  constructor(
    @Inject(AccountPersonRepositoryOutboundPortSymbol)
    private readonly accountPersonRepository: AccountPersonRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<AccountPersonType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name', 'nickname', 'governanceSocialIdentity']
    const order = { createdAt: 'ASC' }
    let result = await this.accountPersonRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let accountPerson = result.data.map((accountPerson) => accountPerson as AccountPersonType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: accountPerson,
    }
  }
}
