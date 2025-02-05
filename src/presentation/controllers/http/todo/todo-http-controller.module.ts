import { Module } from '@nestjs/common'
import { TodoHttpController } from '@/presentation/controllers/http/todo/todo-http.controller'
import { TodoModule } from '@/application/services/todo/todo.module'

@Module({
  imports: [TodoModule],
  controllers: [TodoHttpController],
})
export class TodoHttpControllerModule {}
