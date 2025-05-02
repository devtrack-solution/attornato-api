import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'

export const ListToSelectFreeField2InboundPortToken = Symbol.for('ListToSelectFreeField2InboundPortToken')

export interface ListToSelectFreeField2InboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<FreeField2Type.Output[]>> {}
