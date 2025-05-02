import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'

export const CreateDetailInboundPortToken = Symbol.for('CreateDetailInboundPortToken')

export interface CreateDetailInboundPort extends IServiceWithDataInboundPort<DetailType.Input, undefined, DetailType.Output> {}
