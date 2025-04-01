import { Test, TestingModule } from '@nestjs/testing'
import { DeleteGroupProcessService } from '@/application/services/group-process/delete-group-process.service'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'
import { mock } from 'jest-mock-extended'

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

  it('should throw an error if groupProcess does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    groupProcessRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
