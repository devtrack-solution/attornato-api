import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObject } from '@/domain/process/component/action-object/business-objects/action-object.bo'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'
import { PatchActionObjectInboundPort } from '@/domain/process/component/action-object/ports/inbound/patch-action-object.inbound-port'
import { ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/component/action-object/ports/outbound/action-object-repository.outbound-port'

@Injectable()
export class PatchActionObjectService implements PatchActionObjectInboundPort {
  constructor(
    @Inject(ActionObjectRepositoryOutboundPortSymbol)
    private readonly groupProcessRepository: ActionObjectRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<ActionObjectType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.groupProcessRepository.patchObject(data, criteria, ActionObject, relations)
  }
}
