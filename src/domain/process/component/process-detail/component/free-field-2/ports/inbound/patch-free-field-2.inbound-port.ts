import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'

export const PatchFreeField2InboundPortToken = Symbol.for('PatchFreeField2InboundPortToken')

export interface PatchFreeField2InboundPort extends IServiceInboundPort<Partial<FreeField2Type.Input>, Criteria.ById, void> {}
