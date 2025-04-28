import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CountyType } from '../../types/county.type'

export const CreateCountyInboundPortToken = Symbol.for('CreateCountyInboundPortToken')

export interface CreateCountyInboundPort extends IServiceWithDataInboundPort<CountyType.Input, undefined, CountyType.Output> {}
