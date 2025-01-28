import { TodoTypes } from '@/domain/todo/types/todo.types'

export const TodoRepositoryOutboundPortSymbol = Symbol('TodoRepositoryOutboundPortSymbol')

export interface TodoRepositoryOutboundPort {
  saveObject(todo: Partial<TodoTypes.Input>): Promise<void>
  findByCriteria(props: TodoTypes.Criteria): Promise<Partial<TodoTypes.Repository> | null>
  findAllByCriteria(props: TodoTypes.Criteria): Promise<Partial<TodoTypes.Repository>[]>
  updateObject(todo: Partial<TodoTypes.Input>): Promise<void>
  deleteObject(id: string): Promise<void>
}
