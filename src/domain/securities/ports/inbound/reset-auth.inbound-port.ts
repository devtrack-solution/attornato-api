import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { AuthType } from '@/domain/securities/types/auth.type'

export const ResetAuthInboundPortToken = Symbol.for('ResetAuthInboundPortToken')

export interface ResetAuthInboundPort extends IServiceWithDataInboundPort<AuthType.ResetPasswordInput, undefined, AuthType.ResetPasswordOutput> {}
