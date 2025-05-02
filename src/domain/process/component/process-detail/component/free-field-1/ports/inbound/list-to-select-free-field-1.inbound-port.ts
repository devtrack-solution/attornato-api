import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'

export const ListToSelectFreeField1InboundPortToken = Symbol.for('ListToSelectFreeField1InboundPortToken')

export interface ListToSelectFreeField1InboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<FreeField1Type.Output[]>> {}
