import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PermissionType } from '@/domain/todo/types/permission.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListPermissionInboundPortToken = Symbol.for('ListPermissionInboundPortToken')

export interface ListPermissionInboundPort extends IServiceInboundPort<PermissionType.Input, Criteria.FindBy, PermissionType.Output> {}
