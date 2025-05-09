import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export const CreateAccountPersonInboundPortToken = Symbol.for('CreateAccountPersonInboundPortToken')

export interface CreateAccountPersonInboundPort extends IServiceWithDataInboundPort<AccountPersonType.Input, undefined, AccountPersonType.Output> {}
