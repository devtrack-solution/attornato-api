import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'
import { ListActionObjectInboundPort } from '@/domain/process/component/action-object/ports/inbound/list-action-object.inbound-port'
import { ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/component/action-object/ports/outbound/action-object-repository.outbound-port'

@Injectable()
export class ListActionObjectService implements ListActionObjectInboundPort {
  constructor(
    @Inject(ActionObjectRepositoryOutboundPortSymbol)
    private readonly actionObjectRepository: ActionObjectRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<ActionObjectType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.actionObjectRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let actionObject = result.data.map((actionObject) => actionObject as ActionObjectType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: actionObject,
    }
  }
}
