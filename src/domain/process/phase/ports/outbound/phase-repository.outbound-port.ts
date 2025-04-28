import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PhaseType } from '../../types/phase.type'

export const PhaseRepositoryOutboundPortSymbol = Symbol('PhaseRepositoryOutboundPortSymbol')

export interface PhaseRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, PhaseType.Input, PhaseType.Output> {}
