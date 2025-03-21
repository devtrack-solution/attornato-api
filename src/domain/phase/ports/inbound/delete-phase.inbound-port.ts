import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeletePhaseInboundPortToken = Symbol.for('DeletePhaseInboundPortToken')

export interface DeletePhaseInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
