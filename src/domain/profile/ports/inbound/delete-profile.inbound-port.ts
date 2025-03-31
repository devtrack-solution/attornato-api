import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteProfileInboundPortToken = Symbol.for('DeleteProfileInboundPortToken')

export interface DeleteProfileInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
