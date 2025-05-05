import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteAdministrativeInboundPortToken = Symbol.for('DeleteAdministrativeInboundPortToken')

export interface DeleteAdministrativeInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
