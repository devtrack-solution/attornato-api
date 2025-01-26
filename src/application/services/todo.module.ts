import { Module } from '@nestjs/common'
import { TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { PrismaTodoRepository } from '@/infrastructure/adapters/database/prisma-todo.repository'
import { CreateTodoService } from '@/application/services/create-todo.service'
import { CreateTodoInputPortToken } from '@/domain/todo/ports/inbound/create-todo.inbound-port'

@Module({
  providers: [
    {
      provide: TodoRepositoryOutboundPortSymbol,
      useClass: PrismaTodoRepository,
    },
    {
      provide: CreateTodoInputPortToken,
      useClass: CreateTodoService,
    },
    CreateTodoService,
  ],
  exports: [CreateTodoInputPortToken, TodoRepositoryOutboundPortSymbol, CreateTodoService],
})
export class TodoModule {}
