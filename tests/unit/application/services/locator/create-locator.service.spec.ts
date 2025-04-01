import { Test, TestingModule } from '@nestjs/testing'
import { LocatorRepositoryOutboundPort, LocatorRepositoryOutboundPortSymbol } from '@/domain/locator/ports/outbound/locator-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateLocatorService } from '@/application/services/locator/create-locator.service'
import { LocatorTestBuilder } from '@tests/unit/application/services/locator/locator-test.builder'

describe('[APPLICATION] - CreateLocatorService', () => {
  let service: CreateLocatorService
  let locatorRepository: jest.Mocked<LocatorRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateLocatorService, { provide: LocatorRepositoryOutboundPortSymbol, useValue: mock<LocatorRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateLocatorService>(CreateLocatorService)
    locatorRepository = module.get(LocatorRepositoryOutboundPortSymbol)
  })

  it('should create a locator successfully', async () => {
    const inputData = LocatorTestBuilder.getSuccess()

    locatorRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(locatorRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', LocatorTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
