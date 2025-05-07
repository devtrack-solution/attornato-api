import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

export const PreferenceRepositoryOutboundPortSymbol = Symbol('PreferenceRepositoryOutboundPortSymbol')

export interface PreferenceRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, PreferenceType.Input, PreferenceType.Output> {}
