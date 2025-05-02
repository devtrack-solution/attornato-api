import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import {
  OriginRepositoryOutboundPort,
  OriginRepositoryOutboundPortSymbol,
} from '@/domain/process/component/origin/ports/outbound/origin-repository.outbound-port'
import { DeleteOriginInboundPort } from '@/domain/process/component/origin/ports/inbound/delete-origin.inbound-port'

@Injectable()
export class DeleteOriginService implements DeleteOriginInboundPort {
  constructor(
    @Inject(OriginRepositoryOutboundPortSymbol)
    private readonly originRepository: OriginRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.originRepository.deleteObject(criteria.id)
  }
}
