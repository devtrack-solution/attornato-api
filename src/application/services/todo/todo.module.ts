import { Module } from '@nestjs/common'
import { TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoRepository } from '@/infrastructure/adapters/pgsql/repositories/todo.repository'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'
import { CreateTodoInputPortToken } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoCreatedListener } from '@/application/services/todo/todo-created.listener'
import { TodoCreatedEvent, TodoCreatedEventSymbol } from '@/application/services/todo/todo-created.event'
import { EventBase } from '@/core/event/event-base.emitter'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [
    {
      provide: TodoRepositoryOutboundPortSymbol,
      useClass: TodoRepository,
    },
    {
      provide: CreateTodoInputPortToken,
      useClass: CreateTodoService,
    },
    {
      provide: TodoCreatedEventSymbol,
      useClass: TodoCreatedListener,
    },
  ],
  exports: [
    {
      provide: TodoRepositoryOutboundPortSymbol,
      useClass: TodoRepository,
    },
    {
      provide: CreateTodoInputPortToken,
      useClass: CreateTodoService,
    },
    {
      provide: TodoCreatedEventSymbol,
      useClass: TodoCreatedListener,
    },
  ],
})
export class TodoModule {}
