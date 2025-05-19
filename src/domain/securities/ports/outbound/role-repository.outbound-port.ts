import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { RoleType } from '@/domain/securities/types/role.type'

export const RoleRepositoryOutboundPortSymbol = Symbol('RoleRepositoryOutboundPortSymbol')

export interface RoleRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<RoleType.Input>, RoleType.Output> {}
