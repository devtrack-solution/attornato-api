import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchPrognosisInboundPort } from '@/domain/process/component/prognosis/ports/inbound/patch-prognosis.inbound-port'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { Prognosis } from '@/domain/process/component/prognosis/business-objects/prognosis.bo'

@Injectable()
export class PatchPrognosisService implements PatchPrognosisInboundPort {
  constructor(
    @Inject(PrognosisRepositoryOutboundPortSymbol)
    private readonly prognosisRepository: PrognosisRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<PrognosisType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.prognosisRepository.patchObject(data, criteria, Prognosis, relations)
  }
}
