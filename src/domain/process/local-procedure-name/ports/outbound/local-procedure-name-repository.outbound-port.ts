import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocalProcedureNameType } from '@/domain/process/local-procedure-name/types/local-procedure-name.type'

export const LocalProcedureNameRepositoryOutboundPortSymbol = Symbol('ActionObjectRepositoryOutboundPortSymbol')

export interface LocalProcedureNameRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, LocalProcedureNameType.Input, LocalProcedureNameType.Output> {}
