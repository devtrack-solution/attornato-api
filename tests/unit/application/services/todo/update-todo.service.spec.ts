import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'

import { UpdateTodoService } from '@/application/services/todo/update-todo.service'
import { TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { EventBase } from '@/core/event/event-base.emitter'
import { TodoTestBuilder } from '@tests/unit//application/services/todo/todo-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - UpdateTodoService', () => {
  let service: UpdateTodoService
  let todoRepository: jest.Mocked<TodoRepositoryOutboundPort>
  let eventBase: jest.Mocked<EventBase>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTodoService, { provide: TodoRepositoryOutboundPortSymbol, useValue: mock<TodoRepositoryOutboundPort>() }, { provide: EventBase, useValue: mock<EventBase>() }],
    }).compile()

    service = module.get<UpdateTodoService>(UpdateTodoService)
    todoRepository = module.get(TodoRepositoryOutboundPortSymbol)
    eventBase = module.get(EventBase)
  })

  it('should update a todo and emit an event', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const existingTodo = TodoTestBuilder.getSuccess()
    const updatedData = TodoTestBuilder.create().withName('Updated Task').build()

    todoRepository.findOneByCriteria.mockResolvedValue(existingTodo)

    try {
      await service.execute(updatedData, criteria)
    } catch (error) {
      console.error('Validation Errors:', JSON.stringify(error, null, 2))
    }
  })

  it('should throw an error if todo is not found', async () => {
    const criteria: Criteria.ById = { id: 'non-existing-id' }
    const updatedData = TodoTestBuilder.getSuccess()

    todoRepository.findOneByCriteria.mockResolvedValue(null)

    await expect(service.execute(updatedData, criteria)).rejects.toThrow()
  })

  it.each([
    ['name is empty', TodoTestBuilder.getFailOnEmptyName()],
    ['email is invalid', TodoTestBuilder.getFailOnEmailInvalid()],
  ])('should fail when %s', async (_, updatedData) => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    // todoRepository.findByCriteria.mockResolvedValue(TodoTestBuilder.getSuccess())

    await expect(service.execute(updatedData, criteria)).rejects.toThrow()
  })

  it('should return updated todo even if eventBase.send fails', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const existingTodo = TodoTestBuilder.getSuccess()
    const updatedData = TodoTestBuilder.create().withName('Updated Task').build()

    todoRepository.findOneByCriteria.mockResolvedValue(existingTodo)
    todoRepository.updateObject.mockResolvedValue(undefined)
    eventBase.send.mockImplementation(() => {
      throw new Error('Event send failure')
    })

    const result = await service.execute(updatedData, criteria)

    expect(todoRepository.findOneByCriteria).toHaveBeenCalledWith(criteria)
    expect(todoRepository.updateObject).toHaveBeenCalled()
    expect(result.name).toEqual('Updated Task')
  })
})
