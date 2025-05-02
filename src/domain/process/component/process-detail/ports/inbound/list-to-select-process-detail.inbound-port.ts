import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessDetailType } from '../../types/process-detail.type'

export const ListToSelectProcessDetailInboundPortToken = Symbol.for('ListToSelectProcessDetailInboundPortToken')

export interface ListToSelectProcessDetailInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ProcessDetailType.Output[]>> {}
