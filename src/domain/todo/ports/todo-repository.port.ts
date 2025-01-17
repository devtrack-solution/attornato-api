import { DeepPartial } from 'typeorm'
import { Todo } from '@/application/domain/todo/entities/todo.entity'

export interface ITodoRepository {
  save<T extends DeepPartial<Todo>>(data: T): Promise<Todo | undefined>
}
