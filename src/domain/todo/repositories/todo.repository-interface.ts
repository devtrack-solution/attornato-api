import { DeepPartial } from 'typeorm'
import { Todo } from '@/domain/todo/entities/todo.entity'

export interface ITodoRepository {
  save<T extends DeepPartial<Todo>>(data: T): Promise<Todo | undefined>
}
