import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'

export const OnboardingAuthInboundPortToken = Symbol.for('OnboardingAuthInboundPortToken')

export interface OnboardingAuthInboundPort extends IServiceWithDataInboundPort<any, undefined, any> {}
