import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeletePrognosisInboundPortToken = Symbol.for('DeletePrognosisInboundPortToken')

export interface DeletePrognosisInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
