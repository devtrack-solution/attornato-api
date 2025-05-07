import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

export const PatchPreferenceInboundPortToken = Symbol.for('PatchPreferenceInboundPortToken')

export interface PatchPreferenceInboundPort extends IServiceInboundPort<Partial<PreferenceType.Input>, Criteria.ById, void> {}
