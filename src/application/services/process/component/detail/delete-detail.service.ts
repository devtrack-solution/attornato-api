import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import {
  DetailRepositoryOutboundPort,
  DetailRepositoryOutboundPortSymbol,
} from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { DeleteDetailInboundPort } from '@/domain/process/component/detail/ports/inbound/delete-detail.inbound-port'

@Injectable()
export class DeleteDetailService implements DeleteDetailInboundPort {
  constructor(
    @Inject(DetailRepositoryOutboundPortSymbol)
    private readonly detailRepository: DetailRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.detailRepository.deleteObject(criteria.id)
  }
}
