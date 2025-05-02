import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ClientType } from '@/domain/client/types/client.type'

export const CreateClientInboundPortToken = Symbol.for('CreateClientInboundPortToken')

export interface CreateClientInboundPort extends IServiceWithDataInboundPort<ClientType.Input, undefined, ClientType.Output> {}
