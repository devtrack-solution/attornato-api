import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteContactInboundPortToken = Symbol.for('DeleteContactInboundPortToken')

export interface DeleteContactInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
