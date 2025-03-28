import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailsType } from '@/domain/details/types/details.type'
import { ListDetailsInboundPort } from '@/domain/details/ports/inbound/list-details.inbound-port'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/details/ports/outbound/details-repository.outbound-port'

@Injectable()
export class ListDetailsService implements ListDetailsInboundPort {
  constructor(
    @Inject(DetailsRepositoryOutboundPortSymbol)
    private readonly detailsRepository: DetailsRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<DetailsType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.detailsRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  details  = result.data.map(( details ) =>  details  as DetailsType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  details ,
    }
  }
}
