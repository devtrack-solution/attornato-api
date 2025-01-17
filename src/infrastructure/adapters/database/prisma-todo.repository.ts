import { Todo } from '@/domain/todo/entities/todo.entity'
import { type TodoRepositoryOutboundPort } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { Injectable } from '@nestjs/common'
import { Bind } from '@/infrastructure/decorators/bind.decorator'

@Bind(TodoRepositoryOutboundPort, PrismaTodoRepository)
export class PrismaTodoRepository implements TodoRepositoryOutboundPort {
  async save(todo: Todo): Promise<void> {
    // Save todo using Prisma ORM
  }

  async findById(id: string): Promise<Todo | null> {
    // Find todo by ID
    return null
  }
}
