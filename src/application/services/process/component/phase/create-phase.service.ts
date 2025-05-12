import { Phase } from '@/domain/process/component/phase/business-objects/phase.bo'
import { CreatePhaseInboundPort } from '@/domain/process/component/phase/ports/inbound/create-phase-responsible.inbound-port'
import { PhaseRepositoryOutboundPortSymbol, PhaseRepositoryOutboundPort } from '@/domain/process/component/phase/ports/outbound/phase-repository.outbound-port'
import { PhaseType } from '@/domain/process/component/phase/types/phase.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreatePhaseService implements CreatePhaseInboundPort {
  constructor(
    @Inject(PhaseRepositoryOutboundPortSymbol)
    private readonly phaseRepository: PhaseRepositoryOutboundPort,
  ) {}

  async execute(data: PhaseType.Input): Promise<PhaseType.Output> {
    let  phase  = new Phase(data)
    await this.phaseRepository.saveObject( phase.toPersistence())
    return  phase.toJson()
  }
}
