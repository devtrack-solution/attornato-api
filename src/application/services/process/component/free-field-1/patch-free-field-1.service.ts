import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1RepositoryOutboundPort, FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'
import { PatchFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/patch-free-field-1.inbound-port'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'
import { FreeField1 } from '@/domain/process/component/process-detail/component/free-field-1/business-objects/free-field-1.bo'

@Injectable()
export class PatchFreeField1Service implements PatchFreeField1InboundPort {
  constructor(
    @Inject(FreeField1RepositoryOutboundPortSymbol)
    private readonly freeField1Repository: FreeField1RepositoryOutboundPort,
  ) {}

  async execute(data: Partial<FreeField1Type.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.freeField1Repository.patchObject(data, criteria, FreeField1, relations)
  }
}
