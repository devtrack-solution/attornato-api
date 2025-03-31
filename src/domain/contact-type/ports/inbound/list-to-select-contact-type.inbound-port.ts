import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectContactTypeInboundPortToken = Symbol.for('ListToSelectContactTypeInboundPortToken')

export interface ListToSelectContactTypeInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ContactTypeType.Output[]>> {}
