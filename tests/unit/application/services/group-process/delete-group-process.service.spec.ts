import { Test, TestingModule } from '@nestjs/testing'
import { DeleteGroupProcessService } from '@/application/services/group-process/delete-group-process.service'
import { mock } from 'jest-mock-extended'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'

describe('[APPLICATION] - DeleteGroupProcessService', () => {
  let service: DeleteGroupProcessService
  let groupProcessRepository: jest.Mocked<GroupProcessRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteGroupProcessService, { provide: GroupProcessRepositoryOutboundPortSymbol, useValue: mock<GroupProcessRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteGroupProcessService>(DeleteGroupProcessService)
    groupProcessRepository = module.get(GroupProcessRepositoryOutboundPortSymbol)
  })

  it('should delete a groupProcess by ID', async () => {
    const criteria = { id: 'valid-id' }

    groupProcessRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(groupProcessRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })
})
