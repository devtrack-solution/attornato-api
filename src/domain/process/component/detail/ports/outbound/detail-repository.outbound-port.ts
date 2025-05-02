import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'

export const DetailRepositoryOutboundPortSymbol = Symbol('DetailRepositoryOutboundPortSymbol')

export interface DetailRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, DetailType.Input, DetailType.Output> {}
