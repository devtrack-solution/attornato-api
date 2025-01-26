import { TodoTypes } from '@/domain/todo/types/todo.types'

export const TodoRepositoryOutboundPortSymbol = Symbol('TodoRepositoryOutboundPortSymbol')

export interface TodoRepositoryOutboundPort {
  save(todo: TodoTypes.Input): Promise<void>
  findByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository | null>
  findAllByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository[]>
  update(todo: TodoTypes.Input): Promise<void>
  delete(id: string): Promise<void>
}
