import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'

export const CreateCommunicationChannelInboundPortToken = Symbol.for('CreateCommunicationChannelInboundPortToken')

export interface CreateCommunicationChannelInboundPort extends IServiceWithDataInboundPort<CommunicationChannelType.Input, undefined, CommunicationChannelType.Output> {}
