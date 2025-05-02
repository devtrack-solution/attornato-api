import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/patch-responsible.inbound-port'
import { ResponsibleRepositoryOutboundPortSymbol, ResponsibleRepositoryOutboundPort } from '@/domain/process/component/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleType } from '@/domain/process/component/responsible/types/responsible.type'
import { Responsible } from '@/domain/process/component/responsible/business-objects/responsible.bo'

@Injectable()
export class PatchResponsibleService implements PatchResponsibleInboundPort {
  constructor(
    @Inject(ResponsibleRepositoryOutboundPortSymbol)
    private readonly responsibleRepository: ResponsibleRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<ResponsibleType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.responsibleRepository.patchObject(data, criteria, Responsible, relations)
  }
}
