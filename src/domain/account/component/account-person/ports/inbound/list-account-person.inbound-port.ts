import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export const ListAccountPersonInboundPortToken = Symbol.for('ListAccountPersonInboundPortToken')

export interface ListAccountPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, AccountPersonType.OutputPaginated> {}
