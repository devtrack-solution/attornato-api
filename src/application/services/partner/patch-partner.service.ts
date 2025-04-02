import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchPartnerInboundPort } from '@/domain/partner/ports/inbound/patch-partner.inbound-port'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/partner/ports/outbound/partner-repository.outbound-port'
import { PartnerType } from '@/domain/partner/types/partner.type'
import { Partner } from '@/domain/partner/business-objects/partner.bo'

@Injectable()
export class PatchPartnerService implements PatchPartnerInboundPort {
  constructor(
    @Inject(PartnerRepositoryOutboundPortSymbol)
    private readonly partnerRepository: PartnerRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<PartnerType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.partnerRepository.patchObject(data, criteria, Partner, relations)
  }
}
