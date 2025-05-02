import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteProcessDetailInboundPortToken = Symbol.for('DeleteProcessDetailInboundPortToken')

export interface DeleteProcessDetailInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
