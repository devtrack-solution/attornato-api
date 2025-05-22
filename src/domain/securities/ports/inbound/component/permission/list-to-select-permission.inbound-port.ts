import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PermissionType } from '@/domain/securities/types/permission.type'

export const ListToSelectPermissionInboundPortToken = Symbol.for('ListToSelectPermissionInboundPortToken')

export interface ListToSelectPermissionInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PermissionType.Output[]>> {}
