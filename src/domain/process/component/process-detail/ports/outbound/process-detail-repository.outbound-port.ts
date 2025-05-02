import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessDetailType } from '../../types/process-detail.type'

export const ProcessDetailRepositoryOutboundPortSymbol = Symbol('ProcessDetailRepositoryOutboundPortSymbol')

export interface ProcessDetailRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ProcessDetailType.Input, ProcessDetailType.Output> {}
