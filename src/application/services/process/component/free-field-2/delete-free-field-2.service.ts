import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2RepositoryOutboundPort, FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'
import { DeleteFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/delete-free-field-2.inbound-port'

@Injectable()
export class DeleteFreeField2Service implements DeleteFreeField2InboundPort {
  constructor(
    @Inject(FreeField2RepositoryOutboundPortSymbol)
    private readonly freeField2Repository: FreeField2RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.freeField2Repository.deleteObject(criteria.id)
  }
}
