import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const GroupProcessRepositoryOutboundPortSymbol = Symbol('GroupProcessRepositoryOutboundPortSymbol')

export interface GroupProcessRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, GroupProcessType.Input, GroupProcessType.Output> {}
