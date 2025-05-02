import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'

export const PatchFreeField1InboundPortToken = Symbol.for('PatchFreeField1InboundPortToken')

export interface PatchFreeField1InboundPort extends IServiceInboundPort<Partial<FreeField1Type.Input>, Criteria.ById, void> {}
