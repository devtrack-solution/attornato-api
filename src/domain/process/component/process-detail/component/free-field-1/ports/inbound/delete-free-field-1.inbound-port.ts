import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteFreeField1InboundPortToken = Symbol.for('DeleteFreeField1InboundPortToken')

export interface DeleteFreeField1InboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
