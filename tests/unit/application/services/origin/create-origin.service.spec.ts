import { Test, TestingModule } from '@nestjs/testing'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/origin/ports/outbound/origin-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateOriginService } from '@/application/services/origin/create-origin.service'
import { OriginTestBuilder } from '@tests/unit/application/services/origin/origin-test.builder'

describe('[APPLICATION] - CreateOriginService', () => {
  let service: CreateOriginService
  let originRepository: jest.Mocked<OriginRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOriginService, { provide: OriginRepositoryOutboundPortSymbol, useValue: mock<OriginRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateOriginService>(CreateOriginService)
    originRepository = module.get(OriginRepositoryOutboundPortSymbol)
  })

  it('should create a origin successfully', async () => {
    const inputData = OriginTestBuilder.getSuccess()

    originRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(originRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', OriginTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
