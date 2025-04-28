import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListResponsibleInboundPort } from '@/domain/process/responsible/ports/inbound/list-responsible.inbound-port'
import { ResponsibleRepositoryOutboundPortSymbol, ResponsibleRepositoryOutboundPort } from '@/domain/process/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleType } from '@/domain/process/responsible/types/responsible.type'

@Injectable()
export class ListResponsibleService implements ListResponsibleInboundPort {
  constructor(
    @Inject(ResponsibleRepositoryOutboundPortSymbol)
    private readonly responsibleRepository: ResponsibleRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<ResponsibleType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.responsibleRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  responsible  = result.data.map(( responsible ) =>  responsible  as ResponsibleType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  responsible ,
    }
  }
}
