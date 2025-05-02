import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessFinancialType } from '../../types/process-financial.type'

export const PatchProcessFinancialInboundPortToken = Symbol.for('PatchProcessFinancialInboundPortToken')

export interface PatchProcessFinancialInboundPort extends IServiceInboundPort<Partial<ProcessFinancialType.Input>, Criteria.ById, void> {}
