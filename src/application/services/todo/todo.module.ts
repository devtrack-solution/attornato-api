import { Module } from '@nestjs/common'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'
import { CreateTodoInputPortToken } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoCreatedListener } from '@/application/services/todo/listeners/todo-created.listener'
import { TodoCreatedEventSymbol } from '@/application/services/todo/events/todo-created.event'
import { CoreModule } from '@/core/core.module'
import { UpdateTodoInputPortToken } from "@/domain/todo/ports/inbound/update-todo.inbound-port";
import { UpdateTodoService } from "@/application/services/todo/update-todo.service";

@Module({
  imports: [CoreModule],
  providers: [
    {
      provide: CreateTodoInputPortToken,
      useClass: CreateTodoService,
    },
    {
      provide: UpdateTodoInputPortToken,
      useClass: UpdateTodoService,
    },
    {
      provide: TodoCreatedEventSymbol,
      useClass: TodoCreatedListener,
    },
  ],
  exports: [
    {
      provide: CreateTodoInputPortToken,
      useClass: CreateTodoService,
    },
    {
      provide: UpdateTodoInputPortToken,
      useClass: UpdateTodoService,
    },
    {
      provide: TodoCreatedEventSymbol,
      useClass: TodoCreatedListener,
    },
  ],
})
export class TodoModule {}
