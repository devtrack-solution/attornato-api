import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteProcessFinancialInboundPortToken = Symbol.for('DeleteProcessFinancialInboundPortToken')

export interface DeleteProcessFinancialInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
