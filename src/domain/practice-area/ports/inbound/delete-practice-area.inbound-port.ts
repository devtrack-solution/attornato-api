import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeletePracticeAreaInboundPortToken = Symbol.for('DeletePracticeAreaInboundPortToken')

export interface DeletePracticeAreaInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
