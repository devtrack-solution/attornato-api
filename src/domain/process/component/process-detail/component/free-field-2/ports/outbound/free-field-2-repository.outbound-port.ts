import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'

export const FreeField2RepositoryOutboundPortSymbol = Symbol('FreeField2RepositoryOutboundPortSymbol')

export interface FreeField2RepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, FreeField2Type.Input, FreeField2Type.Output> {}
