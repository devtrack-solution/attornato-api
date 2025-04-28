import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObjectType } from '@/domain/process/action-object/types/action-object.type'

export const ActionObjectRepositoryOutboundPortSymbol = Symbol('ActionObjectRepositoryOutboundPortSymbol')

export interface ActionObjectRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ActionObjectType.Input, ActionObjectType.Output> {}
