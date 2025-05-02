import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'

export const ListToSelectFreeFieldInboundPortToken = Symbol.for('ListToSelectFreeFieldInboundPortToken')

export interface ListToSelectFreeFieldInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<FreeFieldType.Output[]>> {}
