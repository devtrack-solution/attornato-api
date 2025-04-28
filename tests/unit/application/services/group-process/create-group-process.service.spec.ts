import { Test, TestingModule } from '@nestjs/testing'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/group-process/ports/outbound/group-process-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateGroupProcessService } from '@/application/services/process/group-process/create-group-process.service'
import { GroupProcessTestBuilder } from '@tests/unit/application/services/group-process/group-process-test.builder'

describe('[APPLICATION] - CreateGroupProcessService', () => {
  let service: CreateGroupProcessService
  let groupProcessRepository: jest.Mocked<GroupProcessRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateGroupProcessService, { provide: GroupProcessRepositoryOutboundPortSymbol, useValue: mock<GroupProcessRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateGroupProcessService>(CreateGroupProcessService)
    groupProcessRepository = module.get(GroupProcessRepositoryOutboundPortSymbol)
  })

  it('should create a groupProcess successfully', async () => {
    const inputData = GroupProcessTestBuilder.getSuccess()

    groupProcessRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(groupProcessRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', GroupProcessTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
