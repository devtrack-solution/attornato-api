import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

export const PatchFreeField6InboundPortToken = Symbol.for('PatchFreeField6InboundPortToken')

export interface PatchFreeField6InboundPort extends IServiceInboundPort<Partial<FreeField6Type.Input>, Criteria.ById, void> {}
