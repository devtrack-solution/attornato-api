import { Inject, Injectable } from '@nestjs/common'
import { ListCommunicationChannelInboundPort } from '@/domain/client/person/communication-address/contact/communication-channel/ports/inbound/list-communication-channel.inbound-port'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/client/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { CommunicationChannel } from '@/domain/client/person/communication-address/contact/communication-channel/business-objects/communication-channel.bo'
import { CommunicationChannelType } from '@/domain/client/person/communication-address/contact/communication-channel/types/communication-channel.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListCommunicationChannelService implements ListCommunicationChannelInboundPort {
  constructor(
    @Inject(CommunicationChannelRepositoryOutboundPortSymbol)
    private readonly communicationChannelRepository: CommunicationChannelRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<CommunicationChannelType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.communicationChannelRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  communicationChannel  = result.data.map(( communicationChannel ) =>  communicationChannel  as CommunicationChannelType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  communicationChannel ,
    }
  }
}
