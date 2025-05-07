import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

export const ListToSelectPreferenceInboundPortToken = Symbol.for('ListToSelectPreferenceInboundPortToken')

export interface ListToSelectPreferenceInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PreferenceType.Output[]>> {}
