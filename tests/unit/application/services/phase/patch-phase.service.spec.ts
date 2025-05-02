import { Test, TestingModule } from '@nestjs/testing'
import { PatchPhaseService } from '@/application/services/process/component/phase/patch-phase.service'
import { PhaseRepositoryOutboundPort, PhaseRepositoryOutboundPortSymbol } from '@/domain/process/component/phase/ports/outbound/phase-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PhaseTestBuilder } from '@tests/unit/application/services/phase/phase-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Phase } from '@/domain/process/component/phase/business-objects/phase.bo'

describe('[APPLICATION] - PatchPhaseService', () => {
  let service: PatchPhaseService
  let phaseRepository: jest.Mocked<PhaseRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchPhaseService, { provide: PhaseRepositoryOutboundPortSymbol, useValue: mock<PhaseRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchPhaseService>(PatchPhaseService)
    phaseRepository = module.get(PhaseRepositoryOutboundPortSymbol)
  })

  it('should patch a phase successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = PhaseTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    phaseRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(phaseRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Phase, relations)
  })
})
