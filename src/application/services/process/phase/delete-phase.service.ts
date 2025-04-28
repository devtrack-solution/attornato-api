import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeletePhaseInboundPort } from '@/domain/process/phase/ports/inbound/delete-phase.inbound-port'
import { PhaseRepositoryOutboundPortSymbol, PhaseRepositoryOutboundPort } from '@/domain/process/phase/ports/outbound/phase-repository.outbound-port'

@Injectable()
export class DeletePhaseService implements DeletePhaseInboundPort {
  constructor(
    @Inject(PhaseRepositoryOutboundPortSymbol)
    private readonly phaseRepository: PhaseRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.phaseRepository.deleteObject(criteria.id)
  }
}
