import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PermissionType } from '@/domain/securities/types/permission.type'

export const ListPermissionInboundPortToken = Symbol.for('ListPermissionInboundPortToken')

export interface ListPermissionInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PermissionType.OutputPaginated> {}
