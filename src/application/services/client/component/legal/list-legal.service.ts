import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/list-legal.inbound-port'
import { LegalRepositoryOutboundPortSymbol, LegalRepositoryOutboundPort } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { LegalType } from '@/domain/client/component/legal/types/legal.type'

@Injectable()
export class ListLegalService implements ListLegalInboundPort {
  constructor(
    @Inject(LegalRepositoryOutboundPortSymbol)
    private readonly legalRepository: LegalRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<LegalType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = [
      'groupCustomer',
      'profile',
      'person.communicationAddress.contacts.communicationChannel',
      'person.contactPerson.freeField',
    ]
    const searchFields: string[] = ['companyName', 'person.clientId']
    const order = { createdAt: 'ASC' }
    let result = await this.legalRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  legal  = result.data.map(( legal ) =>  legal  as LegalType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  legal ,
    }
  }
}
