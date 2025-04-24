import { Identifier } from '@/domain/client/identifier/business-objects/identifier.bo'
import { CreateIdentifierInboundPort } from '@/domain/client/identifier/ports/inbound/create-identifier-responsible.inbound-port'
import { IdentifierRepositoryOutboundPortSymbol, IdentifierRepositoryOutboundPort } from '@/domain/client/identifier/ports/outbound/identifier-repository.outbound-port'
import { IdentifierType } from '@/domain/client/identifier/types/identifier.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateIdentifierService implements CreateIdentifierInboundPort {
  constructor(
    @Inject(IdentifierRepositoryOutboundPortSymbol)
    private readonly identifierRepository: IdentifierRepositoryOutboundPort,
  ) {}

  async execute(data: IdentifierType.Input): Promise<IdentifierType.Output> {
    let  identifier  = new Identifier(data)
    await this.identifierRepository.saveObject( identifier .toPersistence())
    return  identifier .toJson()
  }
}
