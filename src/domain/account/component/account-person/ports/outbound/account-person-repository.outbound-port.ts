import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export const AccountPersonRepositoryOutboundPortSymbol = Symbol('AccountPersonRepositoryOutboundPortSymbol')

export interface AccountPersonRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, AccountPersonType.Input, AccountPersonType.Output> {}
