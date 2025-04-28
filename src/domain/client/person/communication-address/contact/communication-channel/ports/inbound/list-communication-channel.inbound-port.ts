import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationChannelType } from '@/domain/client/person/communication-address/contact/communication-channel/types/communication-channel.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListCommunicationChannelInboundPortToken = Symbol.for('ListCommunicationChannelInboundPortToken')

export interface ListCommunicationChannelInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, CommunicationChannelType.OutputPaginated> {}
