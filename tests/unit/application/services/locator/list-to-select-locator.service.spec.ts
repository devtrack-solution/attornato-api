import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectLocatorService } from '@/application/services/locator/list-to-select-locator.service'
import { LocatorRepositoryOutboundPort, LocatorRepositoryOutboundPortSymbol } from '@/domain/locator/ports/outbound/locator-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LocatorTestBuilder } from '@tests/unit/application/services/locator/locator-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectLocatorService', () => {
  let service: ListToSelectLocatorService
  let locatorRepository: jest.Mocked<LocatorRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectLocatorService, { provide: LocatorRepositoryOutboundPortSymbol, useValue: mock<LocatorRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectLocatorService>(ListToSelectLocatorService)
    locatorRepository = module.get(LocatorRepositoryOutboundPortSymbol)
  })

  it('should list locators successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const locators = [LocatorTestBuilder.getSuccess()]

    locatorRepository.findForSelectByCriteria.mockResolvedValue(locators)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(locators[0]))
  })
})
