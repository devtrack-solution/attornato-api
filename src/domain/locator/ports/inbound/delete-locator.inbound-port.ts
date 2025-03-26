import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteLocatorInboundPortToken = Symbol.for('DeleteLocatorInboundPortToken')

export interface DeleteLocatorInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
