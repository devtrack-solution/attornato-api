import { Test, TestingModule } from '@nestjs/testing'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreatePrognosisService } from '@/application/services/process/prognosis/create-prognosis.service'
import { PrognosisTestBuilder } from '@tests/unit/application/services/prognosis/prognosis-test.builder'

describe('[APPLICATION] - CreatePrognosisService', () => {
  let service: CreatePrognosisService
  let prognosisRepository: jest.Mocked<PrognosisRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePrognosisService, { provide: PrognosisRepositoryOutboundPortSymbol, useValue: mock<PrognosisRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreatePrognosisService>(CreatePrognosisService)
    prognosisRepository = module.get(PrognosisRepositoryOutboundPortSymbol)
  })

  it('should create a prognosis successfully', async () => {
    const inputData = PrognosisTestBuilder.getSuccess()

    prognosisRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(prognosisRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', PrognosisTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
