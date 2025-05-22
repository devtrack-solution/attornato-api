import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PermissionType } from '@/domain/securities/types/permission.type'

export const PermissionRepositoryOutboundPortSymbol = Symbol('PermissionRepositoryOutboundPortSymbol')

export interface PermissionRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<PermissionType.Input>, PermissionType.Output> {}
