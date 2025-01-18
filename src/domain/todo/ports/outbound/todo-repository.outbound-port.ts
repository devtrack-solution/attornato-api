import { Todo } from '../../entities/todo.entity'
import { TodoTypes } from "@/domain/todo/types/todo.types";

export const TodoRepositoryOutboundPortToken = Symbol.for('TodoRepositoryOutboundPortToken')

export interface TodoRepositoryOutboundPort {
  save(todo: TodoTypes.Input & TodoTypes.Identity): Promise<void>
  findByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository>
}
