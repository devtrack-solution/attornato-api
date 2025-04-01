import { Test, TestingModule } from '@nestjs/testing'
import { DetailsRepositoryOutboundPort, DetailsRepositoryOutboundPortSymbol } from '@/domain/details/ports/outbound/details-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateDetailsService } from '@/application/services/details/create-details.service'
import { DetailsTestBuilder } from '@tests/unit/application/services/details/details-test.builder'

describe('[APPLICATION] - CreateDetailsService', () => {
  let service: CreateDetailsService
  let detailsRepository: jest.Mocked<DetailsRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDetailsService, { provide: DetailsRepositoryOutboundPortSymbol, useValue: mock<DetailsRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateDetailsService>(CreateDetailsService)
    detailsRepository = module.get(DetailsRepositoryOutboundPortSymbol)
  })

  it('should create a details successfully', async () => {
    const inputData = DetailsTestBuilder.getSuccess()

    detailsRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(detailsRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', DetailsTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
