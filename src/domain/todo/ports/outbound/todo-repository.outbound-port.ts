import { TodoType } from '@/domain/todo/types/todo.type'

export const TodoRepositoryOutboundPortSymbol = Symbol('TodoRepositoryOutboundPortSymbol')

export interface TodoRepositoryOutboundPort {
  saveObject(todo: Partial<TodoType.Input>): Promise<void>
  findByCriteria(props: TodoType.Criteria): Promise<Partial<TodoType.Repository> | null>
  findAllByCriteria(props: TodoType.Criteria): Promise<Partial<TodoType.Repository>[]>
  updateObject(todo: Partial<TodoType.Input>): Promise<void>
  deleteObject(id: string): Promise<void>
}
