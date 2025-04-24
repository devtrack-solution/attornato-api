import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteIndividualInboundPortToken = Symbol.for('DeleteIndividualInboundPortToken')

export interface DeleteIndividualInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
