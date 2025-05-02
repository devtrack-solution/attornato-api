import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2RepositoryOutboundPort, FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'
import { ListFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/list-free-field-2.inbound-port'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'

@Injectable()
export class ListFreeField2Service implements ListFreeField2InboundPort {
  constructor(
    @Inject(FreeField2RepositoryOutboundPortSymbol)
    private readonly freeField2Repository: FreeField2RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<FreeField2Type.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.freeField2Repository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let freeField2 = result.data.map((freeField2) => freeField2 as FreeField2Type.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: freeField2,
    }
  }
}
