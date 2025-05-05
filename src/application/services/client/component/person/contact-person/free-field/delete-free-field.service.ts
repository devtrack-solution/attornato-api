import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteFreeFieldInboundPort } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/delete-free-field.inbound-port'
import {
  FreeFieldRepositoryOutboundPort,
  FreeFieldRepositoryOutboundPortSymbol,
} from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'

@Injectable()
export class DeleteFreeFieldService implements DeleteFreeFieldInboundPort {
  constructor(
    @Inject(FreeFieldRepositoryOutboundPortSymbol)
    private readonly freeFieldRepository: FreeFieldRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.freeFieldRepository.deleteObject(criteria.id)
  }
}
