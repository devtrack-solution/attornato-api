import { Responsible } from '@/domain/process/responsible/business-objects/responsible.bo'
import { CreateResponsibleInboundPort } from '@/domain/process/responsible/ports/inbound/create-responsible.inbound-port'
import { ResponsibleRepositoryOutboundPort, ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleType } from '@/domain/process/responsible/types/responsible.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateResponsibleService implements CreateResponsibleInboundPort {
  constructor(
    @Inject(ResponsibleRepositoryOutboundPortSymbol)
    private readonly responsibleRepository: ResponsibleRepositoryOutboundPort,
  ) {}

  async execute(data: ResponsibleType.Input): Promise<ResponsibleType.Output> {
    let  responsible  = new Responsible(data)
    await this.responsibleRepository.saveObject( responsible .toPersistence())
    return  responsible .toJson()
  }
}
