import { Todo } from '@/domain/todo/entities/todo.entity'
import { type TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoTypes } from '@/domain/todo/types/todo.types'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
@BindProvider(TodoRepositoryOutboundPortSymbol)
export class TodoRepository implements TodoRepositoryOutboundPort {
  async save(todo: Todo): Promise<void> {
    // Save todo using Prisma ORM
    console.log('Saving todo:', todo)
  }

  async findByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository | null> {
    // Find todo by Criteria
    console.log('Finding todo by Criteria: ', JSON.stringify(props))
    return null
  }

  delete(id: string): Promise<void> {
    return Promise.resolve()
  }

  findAllByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository[]> {
    return Promise.resolve([])
  }

  update(todo: TodoTypes.Input): Promise<void> {
    return Promise.resolve()
  }
}
