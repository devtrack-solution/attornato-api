import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactType } from '@/domain/contact/types/contact.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListContactInboundPortToken = Symbol.for('ListContactInboundPortToken')

export interface ListContactInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ContactType.OutputPaginated> {}
