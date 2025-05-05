import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1RepositoryOutboundPort, FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'
import { ListFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/list-free-field-1.inbound-port'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'

@Injectable()
export class ListFreeField1Service implements ListFreeField1InboundPort {
  constructor(
    @Inject(FreeField1RepositoryOutboundPortSymbol)
    private readonly freeField1Repository: FreeField1RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<FreeField1Type.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.freeField1Repository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let freeField1 = result.data.map((freeField1) => freeField1 as FreeField1Type.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: freeField1,
    }
  }
}
