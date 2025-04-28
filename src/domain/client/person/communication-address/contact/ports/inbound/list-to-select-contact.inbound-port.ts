import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ContactType } from '../../types/contact.type'

export const ListToSelectContactInboundPortToken = Symbol.for('ListToSelectContactInboundPortToken')

export interface ListToSelectContactInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ContactType.Output[]>> {}
