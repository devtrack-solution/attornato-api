import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteContactPersonLegalInboundPortToken = Symbol.for('DeleteContactPersonLegalInboundPortToken')

export interface DeleteContactPersonLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
