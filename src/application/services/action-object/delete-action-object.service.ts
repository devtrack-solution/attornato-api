import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import {
  ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol,
} from '@/domain/action-object/ports/outbound/action-object-repository.outbound-port'
import { DeleteActionObjectInboundPort } from '@/domain/action-object/ports/inbound/delete-action-object.inbound-port'

@Injectable()
export class DeleteActionObjectService implements DeleteActionObjectInboundPort {
  constructor(
    @Inject(ActionObjectRepositoryOutboundPortSymbol)
    private readonly actionObjectRepository: ActionObjectRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.actionObjectRepository.deleteObject(criteria.id)
  }
}
