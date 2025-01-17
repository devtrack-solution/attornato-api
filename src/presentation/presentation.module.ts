import { Module } from '@nestjs/common'
import { TodoHttpController } from './controllers/http/todo-http.controller'
import { ApplicationModule } from '@/application/application.module'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'

@Module({
  imports: [ApplicationModule],
  providers: [ApplicationModule],
  controllers: [TodoHttpController],
  exports: [ApplicationModule],
})
export class PresentationModule {}
