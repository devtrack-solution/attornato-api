import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteCommunicationChannelInboundPort } from '@/domain/communication-channel/ports/inbound/delete-communication-channel.inbound-port'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/communication-channel/ports/outbound/communication-channel-repository.outbound-port'

@Injectable()
export class DeleteCommunicationChannelService implements DeleteCommunicationChannelInboundPort {
  constructor(
    @Inject(CommunicationChannelRepositoryOutboundPortSymbol)
    private readonly communicationChannelRepository: CommunicationChannelRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.communicationChannelRepository.deleteObject(criteria.id)
  }
}
