import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationChannelType } from '@/domain/communication-channel/types/communication-channel.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchCommunicationChannelInboundPortToken = Symbol.for('PatchCommunicationChannelInboundPortToken')

export interface PatchCommunicationChannelInboundPort extends IServiceInboundPort<Partial<CommunicationChannelType.Input>, Criteria.ById, void> {}
