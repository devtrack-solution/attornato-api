import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteLegalDataInboundPortToken = Symbol.for('DeleteLegalDataInboundPortToken')

export interface DeleteLegalDataInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
