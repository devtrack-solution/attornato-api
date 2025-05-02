import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/delete-judicial.inbound-port'
import { JudicialRepositoryOutboundPortSymbol, JudicialRepositoryOutboundPort } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'

@Injectable()
export class DeleteJudicialService implements DeleteJudicialInboundPort {
  constructor(
    @Inject(JudicialRepositoryOutboundPortSymbol)
    private readonly judicialRepository: JudicialRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.judicialRepository.deleteObject(criteria.id)
  }
}
