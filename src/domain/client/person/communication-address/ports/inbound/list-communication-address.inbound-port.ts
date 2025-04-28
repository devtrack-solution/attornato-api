import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationAddressType } from '@/domain/client/person/communication-address/types/communication-address.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListCommunicationAddressInboundPortToken = Symbol.for('ListCommunicationAddressInboundPortToken')

export interface ListCommunicationAddressInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, CommunicationAddressType.OutputPaginated> {}
