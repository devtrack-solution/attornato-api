import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessFinancialType } from '../../types/process-financial.type'

export const ListToSelectProcessFinancialInboundPortToken = Symbol.for('ListToSelectProcessFinancialInboundPortToken')

export interface ListToSelectProcessFinancialInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ProcessFinancialType.Output[]>> {}
