import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6RepositoryOutboundPort, FreeField6RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-6/ports/outbound/free-field-6-repository.outbound-port'
import { DeleteFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/delete-free-field-6.inbound-port'

@Injectable()
export class DeleteFreeField6Service implements DeleteFreeField6InboundPort {
  constructor(
    @Inject(FreeField6RepositoryOutboundPortSymbol)
    private readonly freeField6Repository: FreeField6RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.freeField6Repository.deleteObject(criteria.id)
  }
}
