import { Inject, Injectable } from '@nestjs/common'
import { CreateTodoInboundPort } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoType } from '@/domain/todo/types/todo.type'
import { Todo } from '@/domain/todo/business-objects/todo.bo'
import { TodoCreatedEvent, TodoCreatedEventSymbol } from '@/application/services/todo/events/todo-created.event'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { EventQueueService } from '@/application/services/todo/listeners/event-queue.service'

@Injectable()
export class CreateTodoService implements CreateTodoInboundPort {
  constructor(
    @Inject(TodoRepositoryOutboundPortSymbol)
    private readonly todoRepository: TodoRepositoryOutboundPort,
    private eventEmitter: EventEmitter2,
    private readonly eventQueue: EventQueueService,
  ) {}

  async execute(data: TodoType.Input): Promise<TodoType.Output> {
    let todo = new Todo(data)
    const event = new TodoCreatedEvent(todo)

    await this.todoRepository.saveObject(todo.toPersistence())

    this.eventEmitter.emit(TodoCreatedEventSymbol.toString(), event)
    this.eventQueue.enqueue(TodoCreatedEventSymbol, event)

    return todo.toJson()
  }
}
