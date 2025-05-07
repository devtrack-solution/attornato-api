import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchPreferenceInboundPort } from '@/domain/account/component/preference/ports/inbound/patch-preference.inbound-port'
import { PreferenceRepositoryOutboundPort, PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'
import { Preference } from '@/domain/account/component/preference/business-objects/preference.bo'

@Injectable()
export class PatchPreferenceService implements PatchPreferenceInboundPort {
  constructor(
    @Inject(PreferenceRepositoryOutboundPortSymbol)
    private readonly preferenceRepository: PreferenceRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<PreferenceType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.preferenceRepository.patchObject(data, criteria, Preference, relations)
  }
}
