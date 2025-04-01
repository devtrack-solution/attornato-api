import { Test, TestingModule } from '@nestjs/testing'
import { DeleteDetailsService } from '@/application/services/details/delete-details.service'
import { DetailsRepositoryOutboundPort, DetailsRepositoryOutboundPortSymbol } from '@/domain/details/ports/outbound/details-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteDetailsService', () => {
  let service: DeleteDetailsService
  let detailsRepository: jest.Mocked<DetailsRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteDetailsService, { provide: DetailsRepositoryOutboundPortSymbol, useValue: mock<DetailsRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteDetailsService>(DeleteDetailsService)
    detailsRepository = module.get(DetailsRepositoryOutboundPortSymbol)
  })

  it('should delete a details by ID', async () => {
    const criteria = { id: 'valid-id' }

    detailsRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(detailsRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if details does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    detailsRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
