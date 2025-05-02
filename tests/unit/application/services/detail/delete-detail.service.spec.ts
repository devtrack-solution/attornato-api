import { Test, TestingModule } from '@nestjs/testing'
import { DeleteDetailService } from '@/application/services/process/component/detail/delete-detail.service'
import { DetailRepositoryOutboundPort, DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteDetailService', () => {
  let service: DeleteDetailService
  let detailRepository: jest.Mocked<DetailRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteDetailService, { provide: DetailRepositoryOutboundPortSymbol, useValue: mock<DetailRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteDetailService>(DeleteDetailService)
    detailRepository = module.get(DetailRepositoryOutboundPortSymbol)
  })

  it('should delete a detail by ID', async () => {
    const criteria = { id: 'valid-id' }

    detailRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(detailRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if detail does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    detailRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
