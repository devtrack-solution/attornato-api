import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectGroupProcessInboundPort } from '@/domain/group-process/ports/inbound/list-to-select-group-process.inbound-port'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'
import { GroupProcessType } from '@/domain/group-process/types/group-process.type'
import { GroupProcess } from '@/domain/group-process/business-objects/group-process.bo'

@Injectable()
export class ListToSelectGroupProcessService implements ListToSelectGroupProcessInboundPort {
  constructor(
    @Inject(GroupProcessRepositoryOutboundPortSymbol)
    private readonly groupProcessRepository: GroupProcessRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<GroupProcessType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  groupProcess  = await this.groupProcessRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  groupProcess .map(( groupProcess ) => new GroupProcess( groupProcess  as GroupProcessType.Output).toJson())
  }
}
