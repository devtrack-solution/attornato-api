import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export const ListToSelectAccountPersonInboundPortToken = Symbol.for('ListToSelectAccountPersonInboundPortToken')

export interface ListToSelectAccountPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<AccountPersonType.Output[]>> {}
