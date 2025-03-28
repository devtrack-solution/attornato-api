import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeFieldType } from '@/domain/free-field/types/free-field.type'

export const FreeFieldRepositoryOutboundPortSymbol = Symbol('FreeFieldRepositoryOutboundPortSymbol')

export interface FreeFieldRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, FreeFieldType.Input, FreeFieldType.Output> {}
