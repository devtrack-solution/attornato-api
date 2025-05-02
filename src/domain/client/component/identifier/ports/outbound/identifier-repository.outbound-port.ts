import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { IdentifierType } from '../../types/identifier.type'

export const IdentifierRepositoryOutboundPortSymbol = Symbol('IdentifierRepositoryOutboundPortSymbol')

export interface IdentifierRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, IdentifierType.Input, IdentifierType.Output> {}
