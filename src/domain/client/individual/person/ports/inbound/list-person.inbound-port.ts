import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/individual/person/types/person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListContactPersonInboundPortToken = Symbol.for('ListContactPersonInboundPortToken')

export interface ListContactPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PersonType.OutputPaginated> {}
