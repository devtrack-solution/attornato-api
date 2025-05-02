import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'
import { ListDetailInboundPort } from '@/domain/process/component/detail/ports/inbound/list-detail.inbound-port'
import {
  DetailRepositoryOutboundPort,
  DetailRepositoryOutboundPortSymbol,
} from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'

@Injectable()
export class ListDetailService implements ListDetailInboundPort {
  constructor(
    @Inject(DetailRepositoryOutboundPortSymbol)
    private readonly detailRepository: DetailRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<DetailType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.detailRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  detail  = result.data.map(( detail ) =>  detail  as DetailType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  detail ,
    }
  }
}
