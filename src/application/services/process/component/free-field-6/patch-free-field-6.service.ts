import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6RepositoryOutboundPort, FreeField6RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-6/ports/outbound/free-field-6-repository.outbound-port'
import { PatchFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/patch-free-field-6.inbound-port'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'
import { FreeField6 } from '@/domain/process/component/process-detail/component/free-field-6/business-objects/free-field-6.bo'

@Injectable()
export class PatchFreeField6Service implements PatchFreeField6InboundPort {
  constructor(
    @Inject(FreeField6RepositoryOutboundPortSymbol)
    private readonly freeField6Repository: FreeField6RepositoryOutboundPort,
  ) {}

  async execute(data: Partial<FreeField6Type.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.freeField6Repository.patchObject(data, criteria, FreeField6, relations)
  }
}
