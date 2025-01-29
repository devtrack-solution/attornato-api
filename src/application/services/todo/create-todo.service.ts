import { Inject, Injectable } from '@nestjs/common'
import { CreateTodoInboundPort } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoType } from '@/domain/todo/types/todo.type'
import { Todo } from '@/domain/todo/entities/todo.entity'
import { TodoCreatedEvent, TodoCreatedEventSymbol } from '@/application/services/todo/events/todo-created.event'
import { EventBase } from '@/core/event/event-base.emitter'

@Injectable()
export class CreateTodoService implements CreateTodoInboundPort<TodoType.Input, TodoType.Output> {
  constructor(
    @Inject(TodoRepositoryOutboundPortSymbol)
    private readonly todoRepository: TodoRepositoryOutboundPort,
    private readonly eventBase: EventBase,
  ) {}

  async execute(data: TodoType.Input): Promise<TodoType.Output> {
    let todo = new Todo(data)

    await this.todoRepository.saveObject(todo.toPersistence())
    const event = new TodoCreatedEvent(todo)
    this.eventBase.emit(TodoCreatedEventSymbol, event)
    return todo.toJson()
  }
}
