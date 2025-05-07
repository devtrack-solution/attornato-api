import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeletePreferenceInboundPortToken = Symbol.for('DeletePreferenceInboundPortToken')

export interface DeletePreferenceInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
