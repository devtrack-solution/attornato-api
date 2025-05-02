import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/delete-legal.inbound-port'
import { LegalRepositoryOutboundPortSymbol, LegalRepositoryOutboundPort } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'

@Injectable()
export class DeleteLegalService implements DeleteLegalInboundPort {
  constructor(
    @Inject(LegalRepositoryOutboundPortSymbol)
    private readonly legalRepository: LegalRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.legalRepository.deleteObject(criteria.id)
  }
}
