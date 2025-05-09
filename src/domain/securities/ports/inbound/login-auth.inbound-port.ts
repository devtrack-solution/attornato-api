import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { AuthType } from '@/domain/securities/types/auth.type'
import { BaseType } from '@/core/domain/types/base.type'

export const LoginAuthInboundPortToken = Symbol.for('LoginAuthInboundPortToken')

export interface LoginAuthInboundPort extends IServiceWithDataInboundPort<AuthType.LoginOutput, undefined, BaseType.ProfileOutput> {}
