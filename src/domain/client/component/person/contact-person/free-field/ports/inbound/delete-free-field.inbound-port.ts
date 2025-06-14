import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteFreeFieldInboundPortToken = Symbol.for('DeleteFreeFieldInboundPortToken')

export interface DeleteFreeFieldInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
