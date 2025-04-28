import { Test, TestingModule } from '@nestjs/testing'
import { CountyRepositoryOutboundPort, CountyRepositoryOutboundPortSymbol } from '@/domain/process/county/ports/outbound/county-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateCountyService } from '@/application/services/process/county/create-county.service'
import { CountyTestBuilder } from '@tests/unit/application/services/county/county-test.builder'

describe('[APPLICATION] - CreateCountyService', () => {
  let service: CreateCountyService
  let countyRepository: jest.Mocked<CountyRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCountyService, { provide: CountyRepositoryOutboundPortSymbol, useValue: mock<CountyRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateCountyService>(CreateCountyService)
    countyRepository = module.get(CountyRepositoryOutboundPortSymbol)
  })

  it('should create a county successfully', async () => {
    const inputData = CountyTestBuilder.getSuccess()

    countyRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(countyRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', CountyTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
