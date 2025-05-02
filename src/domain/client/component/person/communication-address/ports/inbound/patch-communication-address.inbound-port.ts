import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationAddressType } from '@/domain/client/component/person/communication-address/types/communication-address.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchCommunicationAddressInboundPortToken = Symbol.for('PatchCommunicationAddressInboundPortToken')

export interface PatchCommunicationAddressInboundPort extends IServiceInboundPort<Partial<CommunicationAddressType.Input>, Criteria.ById, void> {}
