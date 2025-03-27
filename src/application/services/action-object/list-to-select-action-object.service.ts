import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObjectType } from '@/domain/action-object/types/action-object.type'
import {
  ListToSelectActionObjectInboundPort
} from '@/domain/action-object/ports/inbound/list-to-select-action-object.inbound-port'
import {
  ActionObjectRepositoryOutboundPort,
  ActionObjectRepositoryOutboundPortSymbol,
} from '@/domain/action-object/ports/outbound/action-object-repository.outbound-port'
import { ActionObject } from '@/domain/action-object/business-objects/action-object.bo'

@Injectable()
export class ListToSelectActionObjectService implements ListToSelectActionObjectInboundPort {
  constructor(
    @Inject(ActionObjectRepositoryOutboundPortSymbol)
    private readonly actionObjectRepository: ActionObjectRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<ActionObjectType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  actionObject  = await this.actionObjectRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  actionObject .map(( actionObject ) => new ActionObject( actionObject  as ActionObjectType.Output).toJson())
  }
}
