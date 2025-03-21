import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Phase } from '@/domain/phase/busness-objects/phase.bo'
import { ListToSelectPhaseInboundPort } from '@/domain/phase/ports/inbound/list-to-select-phase.inbound-port'
import { PhaseRepositoryOutboundPortSymbol, PhaseRepositoryOutboundPort } from '@/domain/phase/ports/outbound/phase-repository.outbound-port'
import { PhaseType } from '@/domain/phase/types/phase.type'

@Injectable()
export class ListToSelectPhaseService implements ListToSelectPhaseInboundPort {
  constructor(
    @Inject(PhaseRepositoryOutboundPortSymbol)
    private readonly phaseRepository: PhaseRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<PhaseType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  phase  = await this.phaseRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  phase .map(( phase ) => new Phase( phase  as PhaseType.Output).toJson())
  }
}
