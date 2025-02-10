import { Module } from '@nestjs/common'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'
import { CreateTodoInboundPortToken } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoCreatedListener } from '@/application/services/todo/listeners/todo-created.listener'
import { TodoCreatedEventSymbol } from '@/application/services/todo/events/todo-created.event'
import { CoreModule } from '@/core/core.module'
import { UpdateTodoInboundPortToken } from "@/domain/todo/ports/inbound/update-todo.inbound-port";
import { UpdateTodoService } from "@/application/services/todo/update-todo.service";

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
    {
      provide: TodoCreatedEventSymbol,
      useClass: TodoCreatedListener,
    },
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
    {
      provide: TodoCreatedEventSymbol,
      useClass: TodoCreatedListener,
    },
  ],
})
export class TodoModule {}
