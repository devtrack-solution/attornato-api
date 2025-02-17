import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { TodoType } from '@/domain/todo/types/todo.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const UpdateTodoInboundPortToken = Symbol.for('UpdateTodoInboundPortToken')

export interface UpdateTodoInboundPort extends IServiceInboundPort<TodoType.Input, Criteria.ById, TodoType.Output> {}
