import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocatorType } from '../../types/locator.type'

export const ListToSelectLocatorInboundPortToken = Symbol.for('ListToSelectLocatorInboundPortToken')

export interface ListToSelectLocatorInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<LocatorType.Output[]>> {}
