import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteFreeField2InboundPortToken = Symbol.for('DeleteFreeField2InboundPortToken')

export interface DeleteFreeField2InboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
