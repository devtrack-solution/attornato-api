import { LegalType } from '@/domain/legal/types/legal.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const LegalRepositoryOutboundPortSymbol = Symbol('LegalRepositoryOutboundPortSymbol')

export interface LegalRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, LegalType.Input, LegalType.Output> {}
