import { Test, TestingModule } from '@nestjs/testing'
import { DeletePracticeAreaService } from '@/application/services/process/practice-area/delete-practice-area.service'
import { PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeletePracticeAreaService', () => {
  let service: DeletePracticeAreaService
  let practiceAreaRepository: jest.Mocked<PracticeAreaRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletePracticeAreaService, { provide: PracticeAreaRepositoryOutboundPortSymbol, useValue: mock<PracticeAreaRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeletePracticeAreaService>(DeletePracticeAreaService)
    practiceAreaRepository = module.get(PracticeAreaRepositoryOutboundPortSymbol)
  })

  it('should delete a practiceArea by ID', async () => {
    const criteria = { id: 'valid-id' }

    practiceAreaRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(practiceAreaRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if practiceArea does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    practiceAreaRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
