import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProceduralStatusType } from '@/domain/procedural-status/types/procedural-status.type'
import {
  ListToSelectProceduralStatusInboundPort
} from '@/domain/procedural-status/ports/inbound/list-to-select-practice-area.inbound-port'
import {
  ProceduralStatusRepositoryOutboundPort,
  ProceduralStatusRepositoryOutboundPortSymbol,
} from '@/domain/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { ProceduralStatus } from '@/domain/procedural-status/business-objects/procedural-status.bo'

@Injectable()
export class ListToSelectProceduralStatusService implements ListToSelectProceduralStatusInboundPort {
  constructor(
    @Inject(ProceduralStatusRepositoryOutboundPortSymbol)
    private readonly proceduralStatusRepository: ProceduralStatusRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<ProceduralStatusType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  proceduralStatus  = await this.proceduralStatusRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  proceduralStatus .map(( proceduralStatus ) => new ProceduralStatus( proceduralStatus  as ProceduralStatusType.Output).toJson())
  }
}
