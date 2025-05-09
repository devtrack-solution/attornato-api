import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountType } from '@/domain/account/types/account.type'
import { AccountEntity } from '@/infrastructure/adapters/pgsql/entities/account.entity'

export const AccountRepositoryOutboundPortSymbol = Symbol('AccountRepositoryOutboundPortSymbol')

export interface AccountRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<AccountEntity>, AccountType.Output> {}
