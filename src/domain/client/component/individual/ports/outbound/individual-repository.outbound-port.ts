import { IndividualType } from '@/domain/client/component/individual/types/individual.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const IndividualRepositoryOutboundPortSymbol = Symbol('IndividualRepositoryOutboundPortSymbol')

export interface IndividualRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<IndividualType.Input>, IndividualType.Output> {}
