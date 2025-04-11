import { Inject, Injectable } from '@nestjs/common'
import { CreateCommunicationChannelInboundPort } from '@/domain/communication-channel/ports/inbound/create-communication-channel.inbound-port'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { CommunicationChannelType } from '@/domain/communication-channel/types/communication-channel.type'
import { CommunicationChannel } from '@/domain/communication-channel/business-objects/communication-channel.bo'

@Injectable()
export class CreateCommunicationChannelService implements CreateCommunicationChannelInboundPort {
  constructor(
    @Inject(CommunicationChannelRepositoryOutboundPortSymbol)
    private readonly communicationChannelRepository: CommunicationChannelRepositoryOutboundPort,
  ) {}

  async execute(data: CommunicationChannelType.Input): Promise<CommunicationChannelType.Output> {
    let  communicationChannel  = new CommunicationChannel(data)
    await this.communicationChannelRepository.saveObject( communicationChannel .toPersistence())
    return  communicationChannel .toJson()
  }
}
