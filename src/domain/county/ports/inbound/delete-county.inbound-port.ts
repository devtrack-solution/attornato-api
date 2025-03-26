import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteCountyInboundPortToken = Symbol.for('DeleteCountyInboundPortToken')

export interface DeleteCountyInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
