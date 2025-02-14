import { IServiceInboundPort } from "@/core/domain/ports/inbound/service.inbound-port";
import { TodoType } from "@/domain/todo/types/todo.type";

export const UpdateTodoInboundPortToken = Symbol.for('UpdateTodoInboundPortToken')

export interface UpdateTodoInboundPort extends IServiceInboundPort<TodoType.Input, TodoType.Criteria, TodoType.Output> {}
