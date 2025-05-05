import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ClientRepositoryOutboundPort, ClientRepositoryOutboundPortSymbol } from '@/domain/client/ports/outbound/client-repository.outbound-port'
import { ListToSelectClientInboundPort } from '@/domain/client/ports/inbound/list-to-select-client.inbound-port'
import { ClientType } from '@/domain/client/types/client.type'
import { Client } from '@/domain/client/business-objects/client.bo'

@Injectable()
export class ListToSelectClientService implements ListToSelectClientInboundPort {
  constructor(
    @Inject(ClientRepositoryOutboundPortSymbol)
    private readonly clientRepository: ClientRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<ClientType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let client = await this.clientRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return client.map((client) => new Client(client as ClientType.Output).toJson())
  }
}
