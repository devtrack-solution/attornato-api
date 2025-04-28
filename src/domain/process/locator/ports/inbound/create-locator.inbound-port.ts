import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LocatorType } from '../../types/locator.type'

export const CreateLocatorInboundPortToken = Symbol.for('CreateLocatorInboundPortToken')

export interface CreateLocatorInboundPort extends IServiceWithDataInboundPort<LocatorType.Input, undefined, LocatorType.Output> {}
