import { TodoRepositoryOutboundPort } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoTypes } from '@/domain/todo/types/todo.types'

export class TodoRepositoryAdapter implements TodoRepositoryOutboundPort {
  async save<T extends any>(data: T): Promise<any> {
    throw new Error('Method not implemented.')
  }

  findByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository | null> {
    return Promise.resolve(null)
  }
}
