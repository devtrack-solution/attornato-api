import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

export const ListPreferenceInboundPortToken = Symbol.for('ListPreferenceInboundPortToken')

export interface ListPreferenceInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PreferenceType.OutputPaginated> {}
