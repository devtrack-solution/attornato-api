import { Todo } from '@/domain/todo/entities/todo.entity'
import { type TodoRepositoryOutboundPort } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { Injectable } from '@nestjs/common'
import * as console from 'node:console'
import { TodoTypes } from '@/domain/todo/types/todo.types'

// @Bind(PrismaTodoRepository, PrismaTodoRepository)
@Injectable()
export class PrismaTodoRepository implements TodoRepositoryOutboundPort {
  async save(todo: Todo): Promise<void> {
    // Save todo using Prisma ORM
    console.log('Saving todo:', todo)
  }

  async findByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository | null> {
    // Find todo by Criteria
    console.log('Finding todo by Criteria: ', JSON.stringify(props))
    return null
  }
}
