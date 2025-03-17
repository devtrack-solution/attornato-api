import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'
import { CreateGroupProcessService } from '@/application/services/group-process/create-group-process.service'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'
import { GroupProcessTestBuilder } from './group-process-test.builder'

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
    expect(result.name).toEqual(inputData.name)
  })
})
