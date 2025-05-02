import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectCommunicationChannelInboundPortToken = Symbol.for('ListToSelectCommunicationChannelInboundPortToken')

export interface ListToSelectCommunicationChannelInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<CommunicationChannelType.Output[]>> {}
