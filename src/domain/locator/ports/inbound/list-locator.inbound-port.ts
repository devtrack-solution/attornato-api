import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocatorType } from '../../types/locator.type'

export const ListLocatorInboundPortToken = Symbol.for('ListLocatorInboundPortToken')

export interface ListLocatorInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, LocatorType.OutputPaginated> {}
