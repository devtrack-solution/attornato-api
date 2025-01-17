import { Module } from '@nestjs/common'
import { TodoHttpController } from './controllers/http/todo-http.controller'
import { ApplicationModule } from '@/application/application.module'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'

@Module({
  imports: [ApplicationModule],
  providers: [CreateTodoService],
  controllers: [TodoHttpController],
  exports: [CreateTodoService],
})
export class PresentationModule {}
