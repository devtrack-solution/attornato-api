import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessType } from '@/domain/process/types/process.type'

export const ListToSelectProcessInboundPortToken = Symbol.for('ListToSelectProcessInboundPortToken')

export interface ListToSelectProcessInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ProcessType.Output[]>> {}
