import { Test, TestingModule } from '@nestjs/testing'
import { DeletePhaseService } from '@/application/services/process/phase/delete-phase.service'
import { PhaseRepositoryOutboundPort, PhaseRepositoryOutboundPortSymbol } from '@/domain/process/phase/ports/outbound/phase-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeletePhaseService', () => {
  let service: DeletePhaseService
  let phaseRepository: jest.Mocked<PhaseRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletePhaseService, { provide: PhaseRepositoryOutboundPortSymbol, useValue: mock<PhaseRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeletePhaseService>(DeletePhaseService)
    phaseRepository = module.get(PhaseRepositoryOutboundPortSymbol)
  })

  it('should delete a phase by ID', async () => {
    const criteria = { id: 'valid-id' }

    phaseRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(phaseRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if phase does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    phaseRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
