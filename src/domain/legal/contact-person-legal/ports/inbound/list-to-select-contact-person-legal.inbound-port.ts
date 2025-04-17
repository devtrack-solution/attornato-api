import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonLegalType } from '@/domain/legal/contact-person-legal/types/contact-person-legal.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectContactPersonLegalInboundPortToken = Symbol.for('ListToSelectContactPersonLegalInboundPortToken')

export interface ListToSelectContactPersonLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ContactPersonLegalType.Output[]>> {}
