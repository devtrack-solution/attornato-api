import { Test, TestingModule } from '@nestjs/testing'
import { DetailRepositoryOutboundPort, DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateDetailService } from '@/application/services/process/component/detail/create-detail.service'
import { DetailTestBuilder } from '@tests/unit/application/services/detail/detail-test.builder'

describe('[APPLICATION] - CreateDetailService', () => {
  let service: CreateDetailService
  let detailRepository: jest.Mocked<DetailRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDetailService, { provide: DetailRepositoryOutboundPortSymbol, useValue: mock<DetailRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateDetailService>(CreateDetailService)
    detailRepository = module.get(DetailRepositoryOutboundPortSymbol)
  })

  it('should create a detail successfully', async () => {
    const inputData = DetailTestBuilder.getSuccess()

    detailRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(detailRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name ?? ''))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([['name is empty', DetailTestBuilder.getFailOnEmptyName()]])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
