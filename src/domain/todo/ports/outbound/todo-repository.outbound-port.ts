import { Todo } from '../../entities/todo.entity'

export const TodoRepositoryOutboundPortToken = Symbol.for('TodoRepositoryOutboundPortToken')

export interface TodoRepositoryOutboundPort {
  save(todo: Todo): Promise<void>
  findById(id: string): Promise<Todo | null>
}
