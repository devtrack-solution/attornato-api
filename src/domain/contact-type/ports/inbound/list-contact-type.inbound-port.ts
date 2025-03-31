import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListContactTypeInboundPortToken = Symbol.for('ListContactTypeInboundPortToken')

export interface ListContactTypeInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ContactTypeType.OutputPaginated> {}
