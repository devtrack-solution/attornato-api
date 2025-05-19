import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { RoleType } from '@/domain/securities/types/role.type'

export const ListToSelectRoleInboundPortToken = Symbol.for('ListToSelectRoleInboundPortToken')

export interface ListToSelectRoleInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<RoleType.Output[]>> {}
