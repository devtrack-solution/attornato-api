import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2RepositoryOutboundPort, FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'
import { PatchFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/patch-free-field-2.inbound-port'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'
import { FreeField2 } from '@/domain/process/component/process-detail/component/free-field-2/business-objects/free-field-2.bo'

@Injectable()
export class PatchFreeField2Service implements PatchFreeField2InboundPort {
  constructor(
    @Inject(FreeField2RepositoryOutboundPortSymbol)
    private readonly freeField2Repository: FreeField2RepositoryOutboundPort,
  ) {}

  async execute(data: Partial<FreeField2Type.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.freeField2Repository.patchObject(data, criteria, FreeField2, relations)
  }
}
