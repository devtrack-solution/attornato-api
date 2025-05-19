import { Legal } from '@/domain/client/component/legal/business-objects/legal.bo'
import { CreateLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/create-legal.inbound-port'
import { LegalRepositoryOutboundPortSymbol, LegalRepositoryOutboundPort } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { LegalType } from '@/domain/client/component/legal/types/legal.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateLegalService implements CreateLegalInboundPort {
  constructor(
    @Inject(LegalRepositoryOutboundPortSymbol)
    private readonly LegalRepository: LegalRepositoryOutboundPort,
  ) {}

  async execute(data: LegalType.Input): Promise<LegalType.Output> {
    let legal = new Legal(data)
    await this.LegalRepository.saveObjectWithRelations(legal.toPersistence())
    return legal.toJson()
  }
}
