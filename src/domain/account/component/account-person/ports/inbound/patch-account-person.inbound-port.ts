import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export const PatchAccountPersonInboundPortToken = Symbol.for('PatchAccountPersonInboundPortToken')

export interface PatchAccountPersonInboundPort extends IServiceInboundPort<Partial<AccountPersonType.Input>, Criteria.ById, void> {}
