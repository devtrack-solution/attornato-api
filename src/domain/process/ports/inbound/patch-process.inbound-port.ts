import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessType } from '@/domain/process/types/process.type'

export const PatchProcessInboundPortToken = Symbol.for('PatchProcessInboundPortToken')

export interface PatchProcessInboundPort extends IServiceInboundPort<Partial<ProcessType.Input>, Criteria.ById, void> {}
