import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { CountyType } from '../../types/county.type'

export const CountyRepositoryOutboundPortSymbol = Symbol('CountyRepositoryOutboundPortSymbol')

export interface CountyRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, CountyType.Input, CountyType.Output> {}
