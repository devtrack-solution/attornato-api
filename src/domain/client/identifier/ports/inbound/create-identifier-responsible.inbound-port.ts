import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { IdentifierType } from '../../types/identifier.type'

export const CreateIdentifierInboundPortToken = Symbol.for('CreateIdentifierInboundPortToken')

export interface CreateIdentifierInboundPort extends IServiceWithDataInboundPort<IdentifierType.Input, undefined, IdentifierType.Output> {}
