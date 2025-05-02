import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListCountyInboundPort } from '@/domain/process/component/county/ports/inbound/list-county.inbound-port'
import { CountyRepositoryOutboundPortSymbol, CountyRepositoryOutboundPort } from '@/domain/process/component/county/ports/outbound/county-repository.outbound-port'
import { CountyType } from '@/domain/process/component/county/types/county.type'

@Injectable()
export class ListCountyService implements ListCountyInboundPort {
  constructor(
    @Inject(CountyRepositoryOutboundPortSymbol)
    private readonly CountyRepository: CountyRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<CountyType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.CountyRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  county  = result.data.map(( county ) =>  county  as CountyType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  county ,
    }
  }
}
