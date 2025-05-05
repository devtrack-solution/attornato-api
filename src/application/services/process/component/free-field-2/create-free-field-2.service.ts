import { Inject, Injectable } from '@nestjs/common'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'
import { CreateFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/create-free-field-2.inbound-port'
import { FreeField2RepositoryOutboundPort, FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'
import { FreeField2 } from '@/domain/process/component/process-detail/component/free-field-2/business-objects/free-field-2.bo'

@Injectable()
export class CreateFreeField2Service implements CreateFreeField2InboundPort {
  constructor(
    @Inject(FreeField2RepositoryOutboundPortSymbol)
    private readonly freeField2Repository: FreeField2RepositoryOutboundPort,
  ) {}

  async execute(data: FreeField2Type.Input): Promise<FreeField2Type.Output> {
    let freeField2 = new FreeField2(data)
    await this.freeField2Repository.saveObject(freeField2.toPersistence())
    return freeField2.toJson()
  }
}
