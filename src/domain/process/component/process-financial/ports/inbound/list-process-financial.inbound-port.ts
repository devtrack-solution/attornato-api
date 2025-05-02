import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessFinancialType } from '../../types/process-financial.type'

export const ListProcessFinancialInboundPortToken = Symbol.for('ListProcessFinancialInboundPortToken')

export interface ListProcessFinancialInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ProcessFinancialType.OutputPaginated> {}
