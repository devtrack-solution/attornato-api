import { TodoTypes } from "@/domain/todo/types/todo.types";

export const CreateTodoInputPortToken = Symbol.for('CreateTodoInputPortToken')

export interface CreateTodoInboundPort {
  execute: (data: TodoTypes.Input) => Promise<TodoTypes.Output>
}
