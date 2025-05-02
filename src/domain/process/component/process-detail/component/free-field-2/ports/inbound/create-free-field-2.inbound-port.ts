import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'

export const CreateFreeField2InboundPortToken = Symbol.for('CreateFreeField2InboundPortToken')

export interface CreateFreeField2InboundPort extends IServiceWithDataInboundPort<FreeField2Type.Input, undefined, FreeField2Type.Output> {}
