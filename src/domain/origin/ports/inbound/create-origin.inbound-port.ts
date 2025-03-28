import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { OriginType } from '@/domain/origin/types/origin.type'

export const CreateOriginInboundPortToken = Symbol.for('CreateOriginInboundPortToken')

export interface CreateOriginInboundPort extends IServiceWithDataInboundPort<OriginType.Input, undefined, OriginType.Output> {}
