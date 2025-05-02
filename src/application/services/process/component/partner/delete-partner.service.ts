import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeletePartnerInboundPort } from '@/domain/process/component/partner/ports/inbound/delete-partner.inbound-port'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/component/partner/ports/outbound/partner-repository.outbound-port'

@Injectable()
export class DeletePartnerService implements DeletePartnerInboundPort {
  constructor(
    @Inject(PartnerRepositoryOutboundPortSymbol)
    private readonly partnerRepository: PartnerRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.partnerRepository.deleteObject(criteria.id)
  }
}
