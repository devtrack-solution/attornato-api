import { Inject, Injectable } from '@nestjs/common'
import { CreatePreferenceInboundPort } from '@/domain/account/component/preference/ports/inbound/create-preference.inbound-port'
import { PreferenceRepositoryOutboundPort, PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'
import { Preference } from '@/domain/account/component/preference/business-objects/preference.bo'

@Injectable()
export class CreatePreferenceService implements CreatePreferenceInboundPort {
  constructor(
    @Inject(PreferenceRepositoryOutboundPortSymbol)
    private readonly preferenceRepository: PreferenceRepositoryOutboundPort,
  ) {}

  async execute(data: PreferenceType.Input): Promise<PreferenceType.Output> {
    let preference = new Preference(data)
    await this.preferenceRepository.saveObject(preference.toPersistence())
    return preference.toJson()
  }
}
