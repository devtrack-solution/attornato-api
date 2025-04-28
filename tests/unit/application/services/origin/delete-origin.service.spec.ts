import { Test, TestingModule } from '@nestjs/testing'
import { DeleteOriginService } from '@/application/services/process/origin/delete-origin.service'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/process/origin/ports/outbound/origin-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteOriginService', () => {
  let service: DeleteOriginService
  let originRepository: jest.Mocked<OriginRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteOriginService, { provide: OriginRepositoryOutboundPortSymbol, useValue: mock<OriginRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteOriginService>(DeleteOriginService)
    originRepository = module.get(OriginRepositoryOutboundPortSymbol)
  })

  it('should delete a origin by ID', async () => {
    const criteria = { id: 'valid-id' }

    originRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(originRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if origin does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    originRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
