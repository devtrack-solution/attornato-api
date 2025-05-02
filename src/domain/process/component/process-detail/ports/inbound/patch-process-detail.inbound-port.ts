import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessDetailType } from '../../types/process-detail.type'

export const PatchProcessDetailInboundPortToken = Symbol.for('PatchProcessDetailInboundPortToken')

export interface PatchProcessDetailInboundPort extends IServiceInboundPort<Partial<ProcessDetailType.Input>, Criteria.ById, void> {}
