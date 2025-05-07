import { Inject, Injectable } from '@nestjs/common'
import { ListPreferenceInboundPort } from '@/domain/account/component/preference/ports/inbound/list-preference.inbound-port'
import { PreferenceRepositoryOutboundPort, PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'
import { Preference } from '@/domain/account/component/preference/business-objects/preference.bo'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListPreferenceService implements ListPreferenceInboundPort {
  constructor(
    @Inject(PreferenceRepositoryOutboundPortSymbol)
    private readonly preferenceRepository: PreferenceRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<PreferenceType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['key', 'value']
    const order = { createdAt: 'ASC' }
    let result = await this.preferenceRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  preference  = result.data.map(( preference ) =>  preference  as PreferenceType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  preference,
    }
  }
}
