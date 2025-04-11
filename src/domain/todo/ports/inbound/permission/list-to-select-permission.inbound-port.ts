import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectPermissionInboundPortToken = Symbol.for('ListToSelectPermissionInboundPortToken')

export interface ListToSelectPermissionInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PermissionType.Output[]>> {}
