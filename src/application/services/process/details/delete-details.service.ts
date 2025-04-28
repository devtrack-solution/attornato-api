import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/process/details/ports/outbound/details-repository.outbound-port'
import { DeleteDetailsInboundPort } from '@/domain/process/details/ports/inbound/delete-details.inbound-port'

@Injectable()
export class DeleteDetailsService implements DeleteDetailsInboundPort {
  constructor(
    @Inject(DetailsRepositoryOutboundPortSymbol)
    private readonly detailsRepository: DetailsRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.detailsRepository.deleteObject(criteria.id)
  }
}
