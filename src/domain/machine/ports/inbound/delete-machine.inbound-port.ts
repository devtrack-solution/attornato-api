import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const DeleteMachineInboundPortToken = Symbol.for('DeleteMachineInboundPortToken')

export interface DeleteMachineInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, void> {}
