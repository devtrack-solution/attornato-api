import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Administrative } from '@/domain/process/component/administrative/business-objects/administrative.bo'
import { PatchAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/patch-administrative.inbound-port'
import { AdministrativeRepositoryOutboundPortSymbol, AdministrativeRepositoryOutboundPort } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'

@Injectable()
export class PatchAdministrativeService implements PatchAdministrativeInboundPort {
  constructor(
    @Inject(AdministrativeRepositoryOutboundPortSymbol)
    private readonly administrativeRepository: AdministrativeRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<AdministrativeType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.administrativeRepository.patchObject(data, criteria, Administrative, relations)
  }
}
