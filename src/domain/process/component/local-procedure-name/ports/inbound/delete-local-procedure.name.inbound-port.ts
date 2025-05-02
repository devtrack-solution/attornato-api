import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteLocalProcedureNameInboundPortToken = Symbol.for('DeleteLocalProcedureNameInboundPortToken')

export interface DeleteLocalProcedureNameInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
