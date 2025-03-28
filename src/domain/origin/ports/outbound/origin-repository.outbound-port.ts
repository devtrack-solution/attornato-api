import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { OriginType } from '@/domain/origin/types/origin.type'

export const OriginRepositoryOutboundPortSymbol = Symbol('OriginRepositoryOutboundPortSymbol')

export interface OriginRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, OriginType.Input, OriginType.Output> {}
