import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteDetailInboundPortToken = Symbol.for('DeleteDetailInboundPortToken')

export interface DeleteDetailInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
