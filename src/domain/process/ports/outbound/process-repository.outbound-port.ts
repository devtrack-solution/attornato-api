import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { ProcessType } from '@/domain/process/types/process.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ProcessRepositoryOutboundPortSymbol = Symbol('ProcessRepositoryOutboundPortSymbol')

export interface ProcessRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<ProcessType.Input>, ProcessType.Output> {}
