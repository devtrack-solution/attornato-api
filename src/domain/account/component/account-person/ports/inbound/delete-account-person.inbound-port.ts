import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteAccountPersonInboundPortToken = Symbol.for('DeleteAccountPersonInboundPortToken')

export interface DeleteAccountPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
