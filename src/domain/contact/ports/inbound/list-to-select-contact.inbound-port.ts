import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactType } from '@/domain/contact/types/contact.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectContactInboundPortToken = Symbol.for('ListToSelectContactInboundPortToken')

export interface ListToSelectContactInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ContactType.Output[]>> {}
