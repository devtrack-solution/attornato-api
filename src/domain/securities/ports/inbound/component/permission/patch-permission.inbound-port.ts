import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PermissionType } from '@/domain/securities/types/permission.type'

export const PatchPermissionInboundPortToken = Symbol.for('PatchPermissionInboundPortToken')

export interface PatchPermissionInboundPort extends IServiceInboundPort<Partial<PermissionType.Input>, Criteria.ById, void> {}
