import { Inject, Injectable } from '@nestjs/common'
import { CreateTodoInboundPort } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoRepositoryOutboundPort, TodoRepositoryOutboundPortToken } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoTypes } from "@/domain/todo/types/todo.types";
import { Todo } from "@/domain/todo/entities/todo.entity";

@Injectable()
export class CreateTodoService implements CreateTodoInboundPort {
  constructor(
    @Inject(TodoRepositoryOutboundPortToken)
    private readonly todoRepository: TodoRepositoryOutboundPort,
  ) {}

  async execute(data: TodoTypes.Input): Promise<TodoTypes.Output> {
    let todo = new Todo(data)

    await this.todoRepository.save(todo.toPersistence())
    return todo
  }
}
