import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'
import {
  ListProceduralStatusInboundPort
} from '@/domain/process/component/procedural-status/ports/inbound/list-practice-area.inbound-port'
import {
  ProceduralStatusRepositoryOutboundPort,
  ProceduralStatusRepositoryOutboundPortSymbol,
} from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'

@Injectable()
export class ListProceduralStatusService implements ListProceduralStatusInboundPort {
  constructor(
    @Inject(ProceduralStatusRepositoryOutboundPortSymbol)
    private readonly proceduralStatusRepository: ProceduralStatusRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<ProceduralStatusType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.proceduralStatusRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  proceduralStatus  = result.data.map(( proceduralStatus ) =>  proceduralStatus  as ProceduralStatusType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  proceduralStatus ,
    }
  }
}
