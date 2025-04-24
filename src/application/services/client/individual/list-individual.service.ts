import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListIndividualInboundPort } from '@/domain/client/individual/ports/inbound/list-individual.inbound-port'
import { IndividualRepositoryOutboundPortSymbol, IndividualRepositoryOutboundPort } from '@/domain/client/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualType } from '@/domain/client/individual/types/individual.type'

@Injectable()
export class ListIndividualService implements ListIndividualInboundPort {
  constructor(
    @Inject(IndividualRepositoryOutboundPortSymbol)
    private readonly individualRepository: IndividualRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<IndividualType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.individualRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  individual  = result.data.map(( individual ) =>  individual  as IndividualType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  individual ,
    }
  }
}
