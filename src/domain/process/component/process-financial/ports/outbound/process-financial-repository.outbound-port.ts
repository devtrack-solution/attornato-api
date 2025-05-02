import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessFinancialType } from '../../types/process-financial.type'

export const ProcessFinancialRepositoryOutboundPortSymbol = Symbol('ProcessFinancialRepositoryOutboundPortSymbol')

export interface ProcessFinancialRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ProcessFinancialType.Input, ProcessFinancialType.Output> {}
