import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'

export const CreateFreeField1InboundPortToken = Symbol.for('CreateFreeField1InboundPortToken')

export interface CreateFreeField1InboundPort extends IServiceWithDataInboundPort<FreeField1Type.Input, undefined, FreeField1Type.Output> {}
