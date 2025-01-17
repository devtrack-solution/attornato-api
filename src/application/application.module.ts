import { forwardRef, Module } from '@nestjs/common'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'
import { PrismaTodoRepository } from '@/infrastructure/adapters/database/prisma-todo.repository'
import { CoreModule } from '@/core/core.module'
import { TodoRepositoryOutboundPortToken } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'

@Module({
  imports: [],
  providers: [
    {
      provide: TodoRepositoryOutboundPortToken,
      useClass: CreateTodoService,
    },
  ],
  exports: [TodoRepositoryOutboundPortToken],
})
export class ApplicationModule {}
