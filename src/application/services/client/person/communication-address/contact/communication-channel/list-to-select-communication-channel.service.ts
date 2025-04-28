import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectCommunicationChannelInboundPort } from '@/domain/client/person/communication-address/contact/communication-channel/ports/inbound/list-to-select-communication-channel.inbound-port'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/client/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { CommunicationChannelType } from '@/domain/client/person/communication-address/contact/communication-channel/types/communication-channel.type'
import { CommunicationChannel } from '@/domain/client/person/communication-address/contact/communication-channel/business-objects/communication-channel.bo'

@Injectable()
export class ListToSelectCommunicationChannelService implements ListToSelectCommunicationChannelInboundPort {
  constructor(
    @Inject(CommunicationChannelRepositoryOutboundPortSymbol)
    private readonly communicationChannelRepository: CommunicationChannelRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<CommunicationChannelType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  communicationChannel  = await this.communicationChannelRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  communicationChannel .map(( communicationChannel ) => new CommunicationChannel( communicationChannel  as CommunicationChannelType.Output).toJson())
  }
}
