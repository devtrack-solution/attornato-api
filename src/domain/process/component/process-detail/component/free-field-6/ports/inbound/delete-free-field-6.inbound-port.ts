import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteFreeField6InboundPortToken = Symbol.for('DeleteFreeField6InboundPortToken')

export interface DeleteFreeField6InboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
