import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteGroupProcessInboundPortToken = Symbol.for('DeleteGroupProcessInboundPortToken')

export interface DeleteGroupProcessInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
