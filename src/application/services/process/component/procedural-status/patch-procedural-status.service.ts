import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'
import {
  PatchProceduralStatusInboundPort
} from '@/domain/process/component/procedural-status/ports/inbound/patch-procedural-status.inbound-port'
import {
  ProceduralStatusRepositoryOutboundPort,
  ProceduralStatusRepositoryOutboundPortSymbol,
} from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { ProceduralStatus } from '@/domain/process/component/procedural-status/business-objects/procedural-status.bo'

@Injectable()
export class PatchProceduralStatusService implements PatchProceduralStatusInboundPort {
  constructor(
    @Inject(ProceduralStatusRepositoryOutboundPortSymbol)
    private readonly proceduralStatusRepository: ProceduralStatusRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<ProceduralStatusType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.proceduralStatusRepository.patchObject(data, criteria, ProceduralStatus, relations)
  }
}
