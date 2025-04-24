import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonType } from '@/domain/client/individual/contact-person/types/contact-person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectContactPersonInboundPortToken = Symbol.for('ListToSelectContactPersonInboundPortToken')

export interface ListToSelectContactPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ContactPersonType.Output[]>> {}
