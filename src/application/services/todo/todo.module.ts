import { Module } from '@nestjs/common'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'
import { CreateTodoInboundPortToken } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoCreatedListener } from '@/application/services/todo/listeners/todo-created.listener'
import { CoreModule } from '@/core/core.module'
import { UpdateTodoInboundPortToken } from '@/domain/todo/ports/inbound/update-todo.inbound-port'
import { UpdateTodoService } from '@/application/services/todo/update-todo.service'
import { EventQueueService } from '@/application/services/todo/listeners/event-queue.service'
import { NotificationService } from '@/application/services/todo/listeners/notification.service'

@Module({
  imports: [CoreModule],
  providers: [
    {
      provide: CreateTodoInboundPortToken,
      useClass: CreateTodoService,
    },
    {
      provide: UpdateTodoInboundPortToken,
      useClass: UpdateTodoService,
    },
    TodoCreatedListener,
    EventQueueService,
    NotificationService,
  ],
  exports: [
    {
      provide: CreateTodoInboundPortToken,
      useClass: CreateTodoService,
    },
    {
      provide: UpdateTodoInboundPortToken,
      useClass: UpdateTodoService,
    },
    TodoCreatedListener,
    EventQueueService,
    NotificationService,
  ],
})
export class TodoModule {}
