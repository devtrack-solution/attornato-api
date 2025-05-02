import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProcessType } from '@/domain/process/types/process.type'

export const CreateProcessInboundPortToken = Symbol.for('CreateProcessInboundPortToken')

export interface CreateProcessInboundPort extends IServiceWithDataInboundPort<ProcessType.Input, undefined, ProcessType.Output> {}
