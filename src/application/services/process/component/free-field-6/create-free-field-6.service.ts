import { Inject, Injectable } from '@nestjs/common'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'
import { CreateFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/create-free-field-6.inbound-port'
import { FreeField6RepositoryOutboundPort, FreeField6RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-6/ports/outbound/free-field-6-repository.outbound-port'
import { FreeField6 } from '@/domain/process/component/process-detail/component/free-field-6/business-objects/free-field-6.bo'

@Injectable()
export class CreateFreeField6Service implements CreateFreeField6InboundPort {
  constructor(
    @Inject(FreeField6RepositoryOutboundPortSymbol)
    private readonly freeField6Repository: FreeField6RepositoryOutboundPort,
  ) {}

  async execute(data: FreeField6Type.Input): Promise<FreeField6Type.Output> {
    let freeField6 = new FreeField6(data)
    await this.freeField6Repository.saveObject(freeField6.toPersistence())
    return freeField6.toJson()
  }
}
