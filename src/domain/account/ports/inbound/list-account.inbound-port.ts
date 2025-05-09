import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountType } from '@/domain/account/types/account.type'

export const ListAccountInboundPortToken = Symbol.for('ListAccountInboundPortToken')

export interface ListAccountInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, AccountType.OutputPaginated> {}
