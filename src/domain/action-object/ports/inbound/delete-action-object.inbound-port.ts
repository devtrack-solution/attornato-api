import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteActionObjectInboundPortToken = Symbol.for('DeleteActionObjectInboundPortToken')

export interface DeleteActionObjectInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
