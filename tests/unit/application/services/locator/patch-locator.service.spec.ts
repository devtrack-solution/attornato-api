import { Test, TestingModule } from '@nestjs/testing'
import { PatchLocatorService } from '@/application/services/locator/patch-locator.service'
import { LocatorRepositoryOutboundPort, LocatorRepositoryOutboundPortSymbol } from '@/domain/locator/ports/outbound/locator-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LocatorTestBuilder } from '@tests/unit/application/services/locator/locator-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Locator } from '@/domain/locator/business-objects/locator.bo'

describe('[APPLICATION] - PatchLocatorService', () => {
  let service: PatchLocatorService
  let locatorRepository: jest.Mocked<LocatorRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchLocatorService, { provide: LocatorRepositoryOutboundPortSymbol, useValue: mock<LocatorRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchLocatorService>(PatchLocatorService)
    locatorRepository = module.get(LocatorRepositoryOutboundPortSymbol)
  })

  it('should patch a locator successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = LocatorTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    locatorRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(locatorRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Locator, relations)
  })
})
