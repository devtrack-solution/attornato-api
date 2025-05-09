import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { AuthType } from '@/domain/securities/types/auth.type'
import { BaseType } from '@/core/domain/types/base.type'

export const OnboardingAuthInboundPortToken = Symbol.for('OnboardingAuthInboundPortToken')

export interface OnboardingAuthInboundPort extends IServiceWithDataInboundPort<any, undefined, any> {}
