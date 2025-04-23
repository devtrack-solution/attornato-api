import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonType } from '@/domain/client/legal/contact-person/types/contact-person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListContactPersonInboundPortToken = Symbol.for('ListContactPersonInboundPortToken')

export interface ListContactPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ContactPersonType.OutputPaginated> {}
