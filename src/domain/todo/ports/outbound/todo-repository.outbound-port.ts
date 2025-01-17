import { Todo } from '../../entities/todo.entity'

export interface TodoRepositoryOutboundPort {
  save(todo: Todo): Promise<void>
  findById(id: string): Promise<Todo | null>
}
