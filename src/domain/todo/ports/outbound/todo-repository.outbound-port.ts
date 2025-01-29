import { TodoType } from '@/domain/todo/types/todo.type'
import {
  IRelationalDatabaseOutboundPort
} from "@/core/domain/ports/outbound/relational-database.outbound-port";

export const TodoRepositoryOutboundPortSymbol = Symbol('TodoRepositoryOutboundPortSymbol')

export interface TodoRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<TodoType.Criteria, TodoType.Input, TodoType.Repository> {}

