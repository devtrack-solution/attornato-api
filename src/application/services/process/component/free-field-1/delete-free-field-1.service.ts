import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1RepositoryOutboundPort, FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'
import { DeleteFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/delete-free-field-1.inbound-port'

@Injectable()
export class DeleteFreeField1Service implements DeleteFreeField1InboundPort {
  constructor(
    @Inject(FreeField1RepositoryOutboundPortSymbol)
    private readonly freeField1Repository: FreeField1RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.freeField1Repository.deleteObject(criteria.id)
  }
}
