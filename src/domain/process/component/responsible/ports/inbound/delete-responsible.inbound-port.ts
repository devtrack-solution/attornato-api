import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteResponsibleInboundPortToken = Symbol.for('DeleteResponsibleInboundPortToken')

export interface DeleteResponsibleInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
