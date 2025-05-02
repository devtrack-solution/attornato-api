import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6RepositoryOutboundPort, FreeField6RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-6/ports/outbound/free-field-6-repository.outbound-port'
import { ListFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/list-free-field-6.inbound-port'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

@Injectable()
export class ListFreeField6Service implements ListFreeField6InboundPort {
  constructor(
    @Inject(FreeField6RepositoryOutboundPortSymbol)
    private readonly freeField6Repository: FreeField6RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<FreeField6Type.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.freeField6Repository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let freeField6 = result.data.map((freeField6) => freeField6 as FreeField6Type.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: freeField6,
    }
  }
}
