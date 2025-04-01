import { Test, TestingModule } from '@nestjs/testing'
import { PhaseRepositoryOutboundPort, PhaseRepositoryOutboundPortSymbol } from '@/domain/phase/ports/outbound/phase-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreatePhaseService } from '@/application/services/phase/create-phase.service'
import { PhaseTestBuilder } from '@tests/unit/application/services/phase/phase-test.builder'

describe('[APPLICATION] - CreatePhaseService', () => {
  let service: CreatePhaseService
  let phaseRepository: jest.Mocked<PhaseRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePhaseService, { provide: PhaseRepositoryOutboundPortSymbol, useValue: mock<PhaseRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreatePhaseService>(CreatePhaseService)
    phaseRepository = module.get(PhaseRepositoryOutboundPortSymbol)
  })

  it('should create a phase successfully', async () => {
    const inputData = PhaseTestBuilder.getSuccess()

    phaseRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(phaseRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', PhaseTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
