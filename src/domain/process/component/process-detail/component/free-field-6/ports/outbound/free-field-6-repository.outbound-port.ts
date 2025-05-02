import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

export const FreeField6RepositoryOutboundPortSymbol = Symbol('FreeField6RepositoryOutboundPortSymbol')

export interface FreeField6RepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, FreeField6Type.Input, FreeField6Type.Output> {}
