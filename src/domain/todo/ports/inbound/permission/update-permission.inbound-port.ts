import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PermissionType } from '@/domain/todo/types/permission.type'

export const UpdatePermissionInboundPortToken = Symbol.for('UpdatePermissionInboundPortToken')

export interface UpdatePermissionInboundPort extends IServiceInboundPort<PermissionType.Input, Criteria.FindBy, PermissionType.Output> {}
