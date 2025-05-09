import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { AccountType } from '@/domain/account/types/account.type'

export const CreateAccountInboundPortToken = Symbol.for('CreateAccountInboundPortToken')

export interface CreateAccountInboundPort extends IServiceWithDataInboundPort<AccountType.Input, undefined, AccountType.Output> {}
