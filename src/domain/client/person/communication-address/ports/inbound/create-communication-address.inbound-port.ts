import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CommunicationAddressType } from '@/domain/client/person/communication-address/types/communication-address.type'

export const CreateCommunicationAddressInboundPortToken = Symbol.for('CreateCommunicationAddressInboundPortToken')

export interface CreateCommunicationAddressInboundPort extends IServiceWithDataInboundPort<CommunicationAddressType.Input, undefined, CommunicationAddressType.Output> {}
