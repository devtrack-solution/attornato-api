import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/legal/person/types/person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListContactPersonLegalInboundPortToken = Symbol.for('ListContactPersonLegalInboundPortToken')

export interface ListContactPersonLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PersonType.OutputPaginated> {}
