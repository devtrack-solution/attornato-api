import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectCommunicationAddressInboundPortToken = Symbol.for('ListToSelectCommunicationAddressInboundPortToken')

export interface ListToSelectCommunicationAddressInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<CommunicationAddressType.Output[]>> {}
