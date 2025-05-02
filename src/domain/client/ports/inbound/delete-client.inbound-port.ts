import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteClientInboundPortToken = Symbol.for('DeleteClientInboundPortToken')

export interface DeleteClientInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
