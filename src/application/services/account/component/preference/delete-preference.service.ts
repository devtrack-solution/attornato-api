import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeletePreferenceInboundPort } from '@/domain/account/component/preference/ports/inbound/delete-preference.inbound-port'
import { PreferenceRepositoryOutboundPort, PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'

@Injectable()
export class DeletePreferenceService implements DeletePreferenceInboundPort {
  constructor(
    @Inject(PreferenceRepositoryOutboundPortSymbol)
    private readonly preferenceRepository: PreferenceRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.preferenceRepository.deleteObject(criteria.id)
  }
}
