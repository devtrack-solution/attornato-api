import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteProceduralStatusInboundPortToken = Symbol.for('DeleteProceduralStatusInboundPortToken')

export interface DeleteProceduralStatusInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
