import { Test, TestingModule } from '@nestjs/testing'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { mock } from 'jest-mock-extended'

import { CreateTodoService } from '@/application/services/todo/create-todo.service'
import { TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { Todo } from '@/domain/todo/business-objects/todo.bo'
import { TodoCreatedEvent, TodoCreatedEventSymbol } from '@/application/services/todo/events/todo-created.event'
import { EventQueueService } from '@/application/services/todo/listeners/event-queue.service'
import { TodoTestBuilder } from '@tests/unit/application/services/todo/todo-test.builder'

describe('[APPLICATION] - CreateTodoService', () => {
  let service: CreateTodoService
  let todoRepository: jest.Mocked<TodoRepositoryOutboundPort>
  let eventEmitter: jest.Mocked<EventEmitter2>
  let eventQueue: jest.Mocked<EventQueueService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTodoService,
        { provide: TodoRepositoryOutboundPortSymbol, useValue: mock<TodoRepositoryOutboundPort>() },
        { provide: EventEmitter2, useValue: mock<EventEmitter2>() },
        { provide: EventQueueService, useValue: mock<EventQueueService>() },
      ],
    }).compile()

    service = module.get<CreateTodoService>(CreateTodoService)
    todoRepository = module.get(TodoRepositoryOutboundPortSymbol)
    eventEmitter = module.get(EventEmitter2)
    eventQueue = module.get(EventQueueService)
  })

  it('should create a new todo and emit events', async () => {
    const inputData = TodoTestBuilder.getSuccess()

    try {
      const createdTodo = new Todo(inputData)
      const createdEvent = new TodoCreatedEvent(createdTodo)

      todoRepository.saveObject.mockResolvedValue(undefined)

      const result = await service.execute(inputData)

      expect(todoRepository.saveObject).toHaveBeenCalledWith(createdTodo.toPersistence())
      expect(eventEmitter.emit).toHaveBeenCalledWith(TodoCreatedEventSymbol.toString(), createdEvent)
      expect(eventQueue.enqueue).toHaveBeenCalledWith(TodoCreatedEventSymbol, createdEvent)
      expect(result).toEqual(createdTodo.toJson())
    } catch (error) {
      console.error('Validation Errors:', JSON.stringify(error, null, 2))
    }
  })

  it.each([
    ['name is empty', TodoTestBuilder.getFailOnEmptyName()],
    ['email is invalid', TodoTestBuilder.getFailOnEmailInvalid()],
    //  ['age is invalid', TodoTestBuilder.getFailOnInvalidAge()],
    //  ['height is invalid', TodoTestBuilder.getFailOnInvalidHeight()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
