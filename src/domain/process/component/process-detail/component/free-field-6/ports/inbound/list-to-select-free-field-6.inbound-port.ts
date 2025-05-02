import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

export const ListToSelectFreeField6InboundPortToken = Symbol.for('ListToSelectFreeField6InboundPortToken')

export interface ListToSelectFreeField6InboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<FreeField6Type.Output[]>> {}
