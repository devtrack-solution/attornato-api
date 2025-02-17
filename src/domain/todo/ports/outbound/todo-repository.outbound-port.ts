import { TodoType } from '@/domain/todo/types/todo.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const TodoRepositoryOutboundPortSymbol = Symbol('TodoRepositoryOutboundPortSymbol')

export interface TodoRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, TodoType.Input, TodoType.Repository> {}
