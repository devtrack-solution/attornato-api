import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailsType } from '@/domain/process/details/types/details.type'

export const DetailsRepositoryOutboundPortSymbol = Symbol('DetailsRepositoryOutboundPortSymbol')

export interface DetailsRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, DetailsType.Input, DetailsType.Output> {}
