import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { RoleType } from '@/domain/securities/types/role.type'

export const CreateRoleInboundPortToken = Symbol.for('CreateRoleInboundPortToken')

export interface CreateRoleInboundPort extends IServiceWithDataInboundPort<RoleType.Input, undefined, RoleType.Output> {}
