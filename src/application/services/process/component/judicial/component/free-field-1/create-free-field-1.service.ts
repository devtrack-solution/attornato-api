import { Inject, Injectable } from '@nestjs/common'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'
import { CreateFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/create-free-field-1.inbound-port'
import { FreeField1RepositoryOutboundPort, FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'
import { FreeField1 } from '@/domain/process/component/process-detail/component/free-field-1/business-objects/free-field-1.bo'

@Injectable()
export class CreateFreeField1Service implements CreateFreeField1InboundPort {
  constructor(
    @Inject(FreeField1RepositoryOutboundPortSymbol)
    private readonly freeField1Repository: FreeField1RepositoryOutboundPort,
  ) {}

  async execute(data: FreeField1Type.Input): Promise<FreeField1Type.Output> {
    let freeField1 = new FreeField1(data)
    await this.freeField1Repository.saveObject(freeField1.toPersistence())
    return freeField1.toJson()
  }
}
