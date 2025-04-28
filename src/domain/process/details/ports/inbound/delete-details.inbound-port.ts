import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteDetailsInboundPortToken = Symbol.for('DeleteDetailsInboundPortToken')

export interface DeleteDetailsInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
