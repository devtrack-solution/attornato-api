import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListPhaseInboundPort } from '@/domain/phase/ports/inbound/list-phase.inbound-port'
import { PhaseRepositoryOutboundPortSymbol, PhaseRepositoryOutboundPort } from '@/domain/phase/ports/outbound/phase-repository.outbound-port'
import { PhaseType } from '@/domain/phase/types/phase.type'

@Injectable()
export class ListPhaseService implements ListPhaseInboundPort {
  constructor(
    @Inject(PhaseRepositoryOutboundPortSymbol)
    private readonly phaseRepository: PhaseRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<PhaseType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.phaseRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  phase  = result.data.map(( phase ) =>  phase  as PhaseType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  phase ,
    }
  }
}
