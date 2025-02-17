import { PermissionType } from '@/domain/todo/types/permission.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PermissionRepositoryOutboundPortSymbol = Symbol('PermissionRepositoryOutboundPortSymbol')

export interface PermissionRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, PermissionType.Input, PermissionType.Repository> {}
