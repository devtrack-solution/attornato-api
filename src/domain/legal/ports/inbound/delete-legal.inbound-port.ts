import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteLegalInboundPortToken = Symbol.for('DeleteLegalInboundPortToken')

export interface DeleteLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
