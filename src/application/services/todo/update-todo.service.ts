import { Inject, Injectable } from "@nestjs/common";
import { CreateTodoInboundPort } from "@/domain/todo/ports/inbound/create-todo.inbound-port";
import { TodoType } from "@/domain/todo/types/todo.type";
import {
  TodoRepositoryOutboundPort,
  TodoRepositoryOutboundPortSymbol
} from "@/domain/todo/ports/outbound/todo-repository.outbound-port";
import { EventBase } from "@/core/event/event-base.emitter";
import { Todo } from "@/domain/todo/entities/todo.entity";
import { TodoUpdatedEvent, TodoUpdatedEventSymbol } from "@/application/services/todo/events/todo-update.event";

@Injectable()
export class UpdateTodoService implements CreateTodoInboundPort<TodoType.Input, TodoType.Output> {
  constructor(
    @Inject(TodoRepositoryOutboundPortSymbol)
    private readonly todoRepository: TodoRepositoryOutboundPort,
    private readonly eventBase: EventBase,
  ) {}

  async execute(data: TodoType.Input): Promise<TodoType.Output> {
    let todo = new Todo(data)

    await this.todoRepository.updateObject(todo.toPersistence())
    const event = new TodoUpdatedEvent(todo)
    this.eventBase.emit(TodoUpdatedEventSymbol, event)
    return todo.toJson()
  }
}