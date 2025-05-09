import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountType } from '@/domain/account/types/account.type'

export const ListToSelectAccountInboundPortToken = Symbol.for('ListToSelectAccountInboundPortToken')

export interface ListToSelectAccountInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<AccountType.Output[]>> {}
