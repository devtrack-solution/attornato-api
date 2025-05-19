import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchCommunicationChannelInboundPort } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/patch-communication-channel.inbound-port'
import {
  CommunicationChannelRepositoryOutboundPort,
  CommunicationChannelRepositoryOutboundPortSymbol,
} from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'
import { CommunicationChannel } from '@/domain/client/component/person/communication-address/contact/communication-channel/business-objects/communication-channel.bo'

@Injectable()
export class PatchCommunicationChannelService implements PatchCommunicationChannelInboundPort {
  constructor(
    @Inject(CommunicationChannelRepositoryOutboundPortSymbol)
    private readonly communicationChannelRepository: CommunicationChannelRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<CommunicationChannelType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.communicationChannelRepository.patchObject(data, criteria, CommunicationChannel, relations)
  }
}
