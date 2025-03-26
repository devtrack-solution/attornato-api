import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Locator } from '@/domain/locator/business-objects/locator.bo'
import { PatchLocatorInboundPort } from '@/domain/locator/ports/inbound/patch-locator.inbound-port'
import { LocatorRepositoryOutboundPortSymbol, LocatorRepositoryOutboundPort } from '@/domain/locator/ports/outbound/locator-repository.outbound-port'
import { LocatorType } from '@/domain/locator/types/locator.type'

@Injectable()
export class PatchLocatorService implements PatchLocatorInboundPort {
  constructor(
    @Inject(LocatorRepositoryOutboundPortSymbol)
    private readonly locatorRepository: LocatorRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<LocatorType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.locatorRepository.patchObject(data, criteria, Locator, relations)
  }
}
