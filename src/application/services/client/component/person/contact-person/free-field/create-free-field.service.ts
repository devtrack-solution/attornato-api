import { Inject, Injectable } from '@nestjs/common'
import { FreeField } from '@/domain/client/component/person/contact-person/free-field/business-objects/free-field.bo'
import { CreateFreeFieldInboundPort } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/create-free-field.inbound-port'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'

@Injectable()
export class CreateFreeFieldService implements CreateFreeFieldInboundPort {
  constructor(
    @Inject(FreeFieldRepositoryOutboundPortSymbol)
    private readonly freeFieldRepository: FreeFieldRepositoryOutboundPort,
  ) {}

  async execute(data: FreeFieldType.Input): Promise<FreeFieldType.Output> {
    let freeField = new FreeField(data)
    await this.freeFieldRepository.saveObject(freeField.toPersistence())
    return freeField.toJson()
  }
}
