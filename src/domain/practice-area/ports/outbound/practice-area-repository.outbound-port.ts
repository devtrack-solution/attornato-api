import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeAreaType } from '@/domain/practice-area/types/practice-area.type'

export const PracticeAreaRepositoryOutboundPortSymbol = Symbol('PracticeAreaRepositoryOutboundPortSymbol')

export interface PracticeAreaRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, PracticeAreaType.Input, PracticeAreaType.Output> {}
