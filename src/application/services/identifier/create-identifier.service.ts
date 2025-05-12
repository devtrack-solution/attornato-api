import { Inject, Injectable } from '@nestjs/common'
import { CreateIdentifierInboundPort } from '@/domain/identifier/ports/inbound/create-identifier-responsible.inbound-port'
import { IdentifierRepositoryOutboundPort, IdentifierRepositoryOutboundPortSymbol } from '@/domain/identifier/ports/outbound/identifier-repository.outbound-port'
import { IdentifierType } from '@/domain/identifier/types/identifier.type'
import { Identifier } from '@/domain/identifier/business-objects/identifier.bo'

@Injectable()
export class CreateIdentifierService implements CreateIdentifierInboundPort {
  constructor(
    @Inject(IdentifierRepositoryOutboundPortSymbol)
    private readonly identifierRepository: IdentifierRepositoryOutboundPort,
  ) {}

  async execute(data: IdentifierType.Input): Promise<IdentifierType.Output> {
    let identifier = new Identifier(data)
    await this.identifierRepository.saveObject(identifier.toPersistence())
    return identifier.toJson()
  }
}
