import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocatorType } from '../../types/locator.type'

export const PatchLocatorInboundPortToken = Symbol.for('PatchLocatorInboundPortToken')

export interface PatchLocatorInboundPort extends IServiceInboundPort<Partial<LocatorType.Input>, Criteria.ById, void> {}
