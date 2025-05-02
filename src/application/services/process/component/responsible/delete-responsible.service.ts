import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ResponsibleRepositoryOutboundPort, ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/component/responsible/ports/outbound/responsible-repository.outbound-port'
import { DeleteResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/delete-responsible.inbound-port'

@Injectable()
export class DeleteResponsibleService implements DeleteResponsibleInboundPort {
  constructor(
    @Inject(ResponsibleRepositoryOutboundPortSymbol)
    private readonly responsibleRepository: ResponsibleRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.responsibleRepository.deleteObject(criteria.id)
  }
}
