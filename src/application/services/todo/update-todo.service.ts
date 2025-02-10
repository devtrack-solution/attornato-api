import { Inject, Injectable } from "@nestjs/common";
import { TodoType } from "@/domain/todo/types/todo.type";
import {
  TodoRepositoryOutboundPort,
  TodoRepositoryOutboundPortSymbol
} from "@/domain/todo/ports/outbound/todo-repository.outbound-port";
import { EventBase } from "@/core/event/event-base.emitter";
import { Todo } from "@/domain/todo/business-objects/todo.bo";
import { TodoUpdatedEvent, TodoUpdatedEventSymbol } from "@/application/services/todo/events/todo-update.event";
import { UpdateTodoInboundPort } from "@/domain/todo/ports/inbound/update-todo.inbound-port";

@Injectable()
export class UpdateTodoService implements UpdateTodoInboundPort {
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