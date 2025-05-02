import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ResponsibleType } from '../../types/responsible.type'

export const ResponsibleRepositoryOutboundPortSymbol = Symbol('ResponsibleRepositoryOutboundPortSymbol')

export interface ResponsibleRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ResponsibleType.Input, ResponsibleType.Output> {}
