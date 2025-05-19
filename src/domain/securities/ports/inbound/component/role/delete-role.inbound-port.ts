import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteRoleInboundPortToken = Symbol.for('DeleteRoleInboundPortToken')

export interface DeleteRoleInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
