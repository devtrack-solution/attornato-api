import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountType } from '@/domain/account/types/account.type'

export const PatchAccountInboundPortToken = Symbol.for('PatchAccountInboundPortToken')

export interface PatchAccountInboundPort extends IServiceInboundPort<Partial<AccountType.Input>, Criteria.ById, void> {}
