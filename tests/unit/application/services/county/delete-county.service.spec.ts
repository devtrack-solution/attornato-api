import { Test, TestingModule } from '@nestjs/testing'
import { DeleteCountyService } from '@/application/services/process/county/delete-county.service'
import { CountyRepositoryOutboundPort, CountyRepositoryOutboundPortSymbol } from '@/domain/process/county/ports/outbound/county-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteCountyService', () => {
  let service: DeleteCountyService
  let countyRepository: jest.Mocked<CountyRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCountyService, { provide: CountyRepositoryOutboundPortSymbol, useValue: mock<CountyRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteCountyService>(DeleteCountyService)
    countyRepository = module.get(CountyRepositoryOutboundPortSymbol)
  })

  it('should delete a county by ID', async () => {
    const criteria = { id: 'valid-id' }

    countyRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(countyRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if county does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    countyRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
