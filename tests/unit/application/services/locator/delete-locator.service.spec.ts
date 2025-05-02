import { Test, TestingModule } from '@nestjs/testing'
import { DeleteLocatorService } from '@/application/services/process/component/locator/delete-locator.service'
import { LocatorRepositoryOutboundPort, LocatorRepositoryOutboundPortSymbol } from '@/domain/process/component/locator/ports/outbound/locator-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteLocatorService', () => {
  let service: DeleteLocatorService
  let locatorRepository: jest.Mocked<LocatorRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteLocatorService, { provide: LocatorRepositoryOutboundPortSymbol, useValue: mock<LocatorRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteLocatorService>(DeleteLocatorService)
    locatorRepository = module.get(LocatorRepositoryOutboundPortSymbol)
  })

  it('should delete a locator by ID', async () => {
    const criteria = { id: 'valid-id' }

    locatorRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(locatorRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if locator does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    locatorRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
