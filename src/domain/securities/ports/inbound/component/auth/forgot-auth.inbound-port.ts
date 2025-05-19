import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { AuthType } from '@/domain/securities/types/auth.type'

export const ForgotAuthInboundPortToken = Symbol.for('ForgotAuthInboundPortToken')

export interface ForgotAuthInboundPort extends IServiceWithDataInboundPort<AuthType.ForgotPasswordOutput, undefined, void> {}
