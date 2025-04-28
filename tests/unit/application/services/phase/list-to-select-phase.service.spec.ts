import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectPhaseService } from '@/application/services/process/phase/list-to-select-phase.service'
import { PhaseRepositoryOutboundPort, PhaseRepositoryOutboundPortSymbol } from '@/domain/process/phase/ports/outbound/phase-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PhaseTestBuilder } from '@tests/unit/application/services/phase/phase-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectPhaseService', () => {
  let service: ListToSelectPhaseService
  let phaseRepository: jest.Mocked<PhaseRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectPhaseService, { provide: PhaseRepositoryOutboundPortSymbol, useValue: mock<PhaseRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectPhaseService>(ListToSelectPhaseService)
    phaseRepository = module.get(PhaseRepositoryOutboundPortSymbol)
  })

  it('should list phases successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const phases = [PhaseTestBuilder.getSuccess()]

    phaseRepository.findForSelectByCriteria.mockResolvedValue(phases)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(phases[0]))
  })
})
