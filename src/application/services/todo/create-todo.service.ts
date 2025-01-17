import { Injectable } from '@nestjs/common'
import { CreateTodoInboundPort } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoRepositoryOutboundPort } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { Todo } from '@/domain/todo/entities/todo.entity'

@Injectable()
export class CreateTodoService implements CreateTodoInboundPort {
  constructor(private readonly todoRepository: TodoRepositoryOutboundPort) {}

  async execute(data: { title: string }): Promise<Todo> {
    const todo = new Todo(Date.now().toString(), data.title)
    await this.todoRepository.save(todo)
    return todo
  }
}
