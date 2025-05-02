import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProcessDetailType } from '../../types/process-detail.type'

export const CreateProcessDetailInboundPortToken = Symbol.for('CreateProcessDetailInboundPortToken')

export interface CreateProcessDetailInboundPort extends IServiceWithDataInboundPort<ProcessDetailType.Input, undefined, ProcessDetailType.Output> {}
