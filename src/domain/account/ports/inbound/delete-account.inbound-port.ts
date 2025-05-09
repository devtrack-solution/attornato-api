import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteAccountInboundPortToken = Symbol.for('DeleteAccountInboundPortToken')

export interface DeleteAccountInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
