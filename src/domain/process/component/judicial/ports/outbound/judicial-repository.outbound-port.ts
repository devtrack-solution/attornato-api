import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'

export const JudicialRepositoryOutboundPortSymbol = Symbol('JudicialRepositoryOutboundPortSymbol')

export interface JudicialRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<JudicialType.Input>, JudicialType.Output> {}
