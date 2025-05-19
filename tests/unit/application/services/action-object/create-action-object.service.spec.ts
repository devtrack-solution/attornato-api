import { Test, TestingModule } from '@nestjs/testing'
import { ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/component/action-object/ports/outbound/action-object-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateActionObjectService } from '@/application/services/process/component/action-object/create-action-object.service'
import { ActionObjectTestBuilder } from '@tests/unit/application/services/action-object/action-object-test.builder'

describe('[APPLICATION] - CreateActionObjectService', () => {
  let service: CreateActionObjectService
  let actionObjectRepository: jest.Mocked<ActionObjectRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateActionObjectService, { provide: ActionObjectRepositoryOutboundPortSymbol, useValue: mock<ActionObjectRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateActionObjectService>(CreateActionObjectService)
    actionObjectRepository = module.get(ActionObjectRepositoryOutboundPortSymbol)
  })

  it('should create a actionObject successfully', async () => {
    const inputData = ActionObjectTestBuilder.getSuccess()

    actionObjectRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(actionObjectRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([['name is empty', ActionObjectTestBuilder.getFailOnEmptyName()]])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
