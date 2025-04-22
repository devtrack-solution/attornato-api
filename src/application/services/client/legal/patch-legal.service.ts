import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Legal } from '@/domain/client/legal/business-objects/legal.bo'
import { PatchLegalInboundPort } from '@/domain/client/legal/ports/inbound/patch-legal.inbound-port'
import { LegalRepositoryOutboundPortSymbol, LegalRepositoryOutboundPort } from '@/domain/client/legal/ports/outbound/legal-repository.outbound-port'
import { LegalType } from '@/domain/client/legal/types/legal.type'

@Injectable()
export class PatchLegalService implements PatchLegalInboundPort {
  constructor(
    @Inject(LegalRepositoryOutboundPortSymbol)
    private readonly legalRepository: LegalRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<LegalType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.legalRepository.patchObject(data, criteria, Legal, relations)
  }
}
