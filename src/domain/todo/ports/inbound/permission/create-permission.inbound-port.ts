import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PermissionType } from '@/domain/securities/types/permission.type'

export const CreatePermissionInboundPortToken = Symbol.for('CreatePermissionInboundPortToken')

export interface CreatePermissionInboundPort extends IServiceWithDataInboundPort<PermissionType.Input, undefined, PermissionType.Output> {}
