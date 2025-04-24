import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { IdentifierType } from '../../types/identifier.type'

export const LastIdentifierInboundPortToken = Symbol.for('LastIdentifierInboundPortToken')

export interface LastIdentifierInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, IdentifierType.OutputPaginated> {}
