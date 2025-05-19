import { Inject, Injectable } from '@nestjs/common'
import { ListPreferenceInboundPort } from '@/domain/account/component/preference/ports/inbound/list-preference.inbound-port'
import { PreferenceRepositoryOutboundPort, PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

@Injectable()
export class ListPreferenceService implements ListPreferenceInboundPort {
  constructor(
    @Inject(PreferenceRepositoryOutboundPortSymbol)
    private readonly preferenceRepository: PreferenceRepositoryOutboundPort,
  ) {}

  async execute(criteria: PreferenceType.WithAccountId): Promise<PreferenceType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['key', 'value', 'accountId']
    const order = { createdAt: 'ASC' }
    const whereByValue = { accountId: criteria.accountId }
    let result = await this.preferenceRepository.findAllByCriteria(criteria, order, select, searchFields, relations, whereByValue)
    let preference = result.data.map((preference) => preference as PreferenceType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: preference,
    }
  }
}
