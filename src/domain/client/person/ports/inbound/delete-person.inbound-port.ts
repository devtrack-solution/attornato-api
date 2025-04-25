import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteContactPersonInboundPortToken = Symbol.for('DeleteContactPersonInboundPortToken')

export interface DeleteContactPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
