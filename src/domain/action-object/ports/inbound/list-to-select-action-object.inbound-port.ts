import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObjectType } from '@/domain/action-object/types/action-object.type'

export const ListToSelectActionObjectInboundPortToken = Symbol.for('ListToSelectActionObjectInboundPortToken')

export interface ListToSelectActionObjectInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ActionObjectType.Output[]>> {}
