import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { RoleType } from '@/domain/securities/types/role.type'

export const PatchRoleInboundPortToken = Symbol.for('PatchRoleInboundPortToken')

export interface PatchRoleInboundPort extends IServiceInboundPort<Partial<RoleType.Input>, Criteria.ById, void> {}
