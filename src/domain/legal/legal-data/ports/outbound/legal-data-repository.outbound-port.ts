import { LegalDataType } from '@/domain/legal/legal-data/types/legal-data.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const LegalDataRepositoryOutboundPortSymbol = Symbol('LegalDataRepositoryOutboundPortSymbol')

export interface LegalDataRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, LegalDataType.Input, LegalDataType.Output> {}
