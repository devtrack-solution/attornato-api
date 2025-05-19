import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { OriginType } from '@/domain/process/component/origin/types/origin.type'
import { PatchOriginInboundPort } from '@/domain/process/component/origin/ports/inbound/patch-origin.inbound-port'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/process/component/origin/ports/outbound/origin-repository.outbound-port'
import { Origin } from '@/domain/process/component/origin/business-objects/origin.bo'

@Injectable()
export class PatchOriginService implements PatchOriginInboundPort {
  constructor(
    @Inject(OriginRepositoryOutboundPortSymbol)
    private readonly originRepository: OriginRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<OriginType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.originRepository.patchObject(data, criteria, Origin, relations)
  }
}
