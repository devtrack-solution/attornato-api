import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'

export const FreeField1RepositoryOutboundPortSymbol = Symbol('FreeField1RepositoryOutboundPortSymbol')

export interface FreeField1RepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, FreeField1Type.Input, FreeField1Type.Output> {}
