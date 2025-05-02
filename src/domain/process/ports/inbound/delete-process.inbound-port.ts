import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteProcessInboundPortToken = Symbol.for('DeleteProcessInboundPortToken')

export interface DeleteProcessInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
