import { Inject, Injectable } from '@nestjs/common'
import { ListGroupProcessInboundPort } from '@/domain/process/group-process/ports/inbound/list-group-process.inbound-port'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/group-process/ports/outbound/group-process-repository.outbound-port'
import { GroupProcess } from '@/domain/process/group-process/business-objects/group-process.bo'
import { GroupProcessType } from '@/domain/process/group-process/types/group-process.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListGroupProcessService implements ListGroupProcessInboundPort {
  constructor(
    @Inject(GroupProcessRepositoryOutboundPortSymbol)
    private readonly groupProcessRepository: GroupProcessRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<GroupProcessType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.groupProcessRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  groupProcess  = result.data.map(( groupProcess ) =>  groupProcess  as GroupProcessType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  groupProcess ,
    }
  }
}
