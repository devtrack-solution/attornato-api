import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/process/component/origin/ports/outbound/origin-repository.outbound-port'
import { ListOriginInboundPort } from '@/domain/process/component/origin/ports/inbound/list-origin.inbound-port'
import { OriginType } from '@/domain/process/component/origin/types/origin.type'

@Injectable()
export class ListOriginService implements ListOriginInboundPort {
  constructor(
    @Inject(OriginRepositoryOutboundPortSymbol)
    private readonly originRepository: OriginRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<OriginType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.originRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let origin = result.data.map((origin) => origin as OriginType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: origin,
    }
  }
}
