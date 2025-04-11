import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const FindPermissionInboundPortToken = Symbol.for('FindPermissionInboundPortToken')

export interface FindPermissionInboundPort extends IServiceInboundPort<PermissionType.Input, Criteria.ById, PermissionType.Output> {}
