import { IServiceInboundPort } from "@/core/domain/ports/inbound/service.inbound-port";
import { TodoType } from "@/domain/todo/types/todo.type";

export const UpdateTodoInputPortToken = Symbol.for('UpdateTodoInputPortToken')

export interface UpdateTodoInboundPort extends IServiceInboundPort<TodoType.Input, TodoType.Output> {}
