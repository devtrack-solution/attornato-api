import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocatorType } from '../../types/locator.type'

export const LocatorRepositoryOutboundPortSymbol = Symbol('LocatorRepositoryOutboundPortSymbol')

export interface LocatorRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, LocatorType.Input, LocatorType.Output> {}
