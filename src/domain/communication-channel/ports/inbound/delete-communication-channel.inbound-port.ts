import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteCommunicationChannelInboundPortToken = Symbol.for('DeleteCommunicationChannelInboundPortToken')

export interface DeleteCommunicationChannelInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
