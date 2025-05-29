import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListClientInboundPort } from '@/domain/client/ports/inbound/list-client.inbound-port'
import { ClientRepositoryOutboundPort, ClientRepositoryOutboundPortSymbol } from '@/domain/client/ports/outbound/client-repository.outbound-port'
import { ClientType } from '@/domain/client/types/client.type'

@Injectable()
export class ListClientService implements ListClientInboundPort {
  constructor(
    @Inject(ClientRepositoryOutboundPortSymbol)
    private readonly clientRepository: ClientRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<ClientType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = [
      'groupCustomer',
      'profile',
      'person',
      'person.communicationAddress',
      'person.communicationAddress.contacts',
      'person.communicationAddress.contacts.communicationChannel',
      'person.contactPerson',
    ]
    const searchFields: string[] = ['companyName', 'name']
    const order = { createdAt: 'ASC' }
    let result = await this.clientRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let client = result.data.map((client) => client as ClientType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: client,
    }
  }
}
