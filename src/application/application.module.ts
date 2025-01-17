import { Module } from '@nestjs/common'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'

@Module({
  providers: [CreateTodoService],
  exports: [CreateTodoService],
})
export class ApplicationModule {}
