import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProcessFinancialType } from '../../types/process-financial.type'

export const CreateProcessFinancialInboundPortToken = Symbol.for('CreateProcessFinancialInboundPortToken')

export interface CreateProcessFinancialInboundPort extends IServiceWithDataInboundPort<ProcessFinancialType.Input, undefined, ProcessFinancialType.Output> {}
