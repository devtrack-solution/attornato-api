import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Phase } from '@/domain/process/phase/business-objects/phase.bo'
import { PatchPhaseInboundPort } from '@/domain/process/phase/ports/inbound/patch-phase.inbound-port'
import { PhaseRepositoryOutboundPortSymbol, PhaseRepositoryOutboundPort } from '@/domain/process/phase/ports/outbound/phase-repository.outbound-port'
import { PhaseType } from '@/domain/process/phase/types/phase.type'

@Injectable()
export class PatchPhaseService implements PatchPhaseInboundPort {
  constructor(
    @Inject(PhaseRepositoryOutboundPortSymbol)
    private readonly phaseRepository: PhaseRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<PhaseType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.phaseRepository.patchObject(data, criteria, Phase, relations)
  }
}
