import { ProfileType } from '@/domain/profile/types/profile.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ProfileRepositoryOutboundPortSymbol = Symbol('ProfileRepositoryOutboundPortSymbol')

export interface ProfileRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ProfileType.Input, ProfileType.Output> {}
