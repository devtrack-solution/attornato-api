import { IServiceInboundPort } from "@/core/domain/ports/inbound/service.inbound-port";
import { TodoType } from "@/domain/todo/types/todo.type";

export const CreateTodoInboundPortToken = Symbol.for('CreateTodoInboundPortToken')

export interface CreateTodoInboundPort extends IServiceInboundPort<TodoType.Input, TodoType.Output> {}
