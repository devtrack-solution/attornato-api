import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { DetailsType } from '@/domain/process/details/types/details.type'

export const CreateDetailsInboundPortToken = Symbol.for('CreateDetailsInboundPortToken')

export interface CreateDetailsInboundPort extends IServiceWithDataInboundPort<DetailsType.Input, undefined, DetailsType.Output> {}
