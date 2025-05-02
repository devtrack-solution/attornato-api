import { Inject, Injectable } from '@nestjs/common'
import { ActionObject } from '@/domain/process/component/action-object/business-objects/action-object.bo'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'
import { CreateActionObjectInboundPort } from '@/domain/process/component/action-object/ports/inbound/create-action-object.inbound-port'
import {
  ActionObjectRepositoryOutboundPort,
  ActionObjectRepositoryOutboundPortSymbol,
} from '@/domain/process/component/action-object/ports/outbound/action-object-repository.outbound-port'

@Injectable()
export class CreateActionObjectService implements CreateActionObjectInboundPort {
  constructor(
    @Inject(ActionObjectRepositoryOutboundPortSymbol)
    private readonly actionObjectRepository: ActionObjectRepositoryOutboundPort,
  ) {}

  async execute(data: ActionObjectType.Input): Promise<ActionObjectType.Output> {
    let  actionObject  = new ActionObject(data)
    await this.actionObjectRepository.saveObject( actionObject .toPersistence())
    return  actionObject .toJson()
  }
}
