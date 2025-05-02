import { Test, TestingModule } from '@nestjs/testing'
import { PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/component/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreatePracticeAreaService } from '@/application/services/process/component/practice-area/create-practice-area.service'
import { PracticeAreaTestBuilder } from '@tests/unit/application/services/practice-area/practice-area-test.builder'

describe('[APPLICATION] - CreatePracticeAreaService', () => {
  let service: CreatePracticeAreaService
  let practiceAreaRepository: jest.Mocked<PracticeAreaRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePracticeAreaService, { provide: PracticeAreaRepositoryOutboundPortSymbol, useValue: mock<PracticeAreaRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreatePracticeAreaService>(CreatePracticeAreaService)
    practiceAreaRepository = module.get(PracticeAreaRepositoryOutboundPortSymbol)
  })

  it('should create a practiceArea successfully', async () => {
    const inputData = PracticeAreaTestBuilder.getSuccess()

    practiceAreaRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(practiceAreaRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', PracticeAreaTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
