import { Inject, Injectable } from '@nestjs/common'
import { TodoType } from '@/domain/todo/types/todo.type'
import { TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { EventBase } from '@/core/event/event-base.emitter'
import { Todo } from '@/domain/todo/business-objects/todo.bo'
import { TodoUpdatedEvent, TodoUpdatedEventSymbol } from '@/application/services/todo/events/todo-update.event'
import { UpdateTodoInboundPort } from '@/domain/todo/ports/inbound/update-todo.inbound-port'

@Injectable()
export class UpdateTodoService implements UpdateTodoInboundPort {
  constructor(
    @Inject(TodoRepositoryOutboundPortSymbol)
    private readonly todoRepository: TodoRepositoryOutboundPort,
    private readonly eventBase: EventBase,
  ) {}

  async execute(data: TodoType.Input, criteria: TodoType.Criteria): Promise<TodoType.Output> {
    const value = await this.todoRepository.findByCriteria(criteria)

    let todo = Todo.fromRepositoryToDomain(value as TodoType.Repository)

    const updatedTodo = todo.update(data)

    await this.todoRepository.updateObject(updatedTodo.toPersistence())

    try {
      const event = new TodoUpdatedEvent(todo)
      this.eventBase.send(TodoUpdatedEventSymbol, event)
    } catch (error) {
      if (error instanceof Error) {
        console.warn('Event send failure, but update succeeded:', error.message)
      } else {
        console.warn('Event send failure, but update succeeded:', error)
      }
    }

    return todo.toJson()
  }
}
