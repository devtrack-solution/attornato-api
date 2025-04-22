import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonLegalType } from '@/domain/client/legal/contact-person-legal/types/contact-person-legal.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListContactPersonLegalInboundPortToken = Symbol.for('ListContactPersonLegalInboundPortToken')

export interface ListContactPersonLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ContactPersonLegalType.OutputPaginated> {}
