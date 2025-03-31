import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteContactTypeInboundPortToken = Symbol.for('DeleteContactTypeInboundPortToken')

export interface DeleteContactTypeInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
