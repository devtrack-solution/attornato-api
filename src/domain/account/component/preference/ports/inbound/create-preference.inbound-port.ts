import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

export const CreatePreferenceInboundPortToken = Symbol.for('CreatePreferenceInboundPortToken')

export interface CreatePreferenceInboundPort extends IServiceWithDataInboundPort<PreferenceType.Input, undefined, PreferenceType.Output> {}
