import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeArea } from '@/domain/process/practice-area/business-objects/practice-area.bo'
import { PracticeAreaType } from '@/domain/process/practice-area/types/practice-area.type'
import { PatchPracticeAreaInboundPort } from '@/domain/process/practice-area/ports/inbound/patch-practice-area.inbound-port'
import {
  PracticeAreaRepositoryOutboundPort,
  PracticeAreaRepositoryOutboundPortSymbol,
} from '@/domain/process/practice-area/ports/outbound/practice-area-repository.outbound-port'

@Injectable()
export class PatchPracticeAreaService implements PatchPracticeAreaInboundPort {
  constructor(
    @Inject(PracticeAreaRepositoryOutboundPortSymbol)
    private readonly practiceAreaRepository: PracticeAreaRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<PracticeAreaType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.practiceAreaRepository.patchObject(data, criteria, PracticeArea, relations)
  }
}
