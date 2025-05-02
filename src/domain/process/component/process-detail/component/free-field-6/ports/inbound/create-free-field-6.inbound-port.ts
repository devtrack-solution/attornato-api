import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

export const CreateFreeField6InboundPortToken = Symbol.for('CreateFreeField6InboundPortToken')

export interface CreateFreeField6InboundPort extends IServiceWithDataInboundPort<FreeField6Type.Input, undefined, FreeField6Type.Output> {}
