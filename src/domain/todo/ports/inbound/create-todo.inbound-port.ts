import { IServiceInboundPort, IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { TodoType } from '@/domain/todo/types/todo.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const CreateTodoInboundPortToken = Symbol.for('CreateTodoInboundPortToken')

export interface CreateTodoInboundPort extends IServiceWithDataInboundPort<TodoType.Input, Criteria.ById, TodoType.Output> {}
