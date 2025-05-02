import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteGroupCustomerInboundPortToken = Symbol.for('DeleteGroupCustomerInboundPortToken')

export interface DeleteGroupCustomerInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
