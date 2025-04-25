import { PersonType } from '@/domain/client/person/types/person.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PersonRepositoryOutboundPortSymbol = Symbol('PersonRepositoryOutboundPortSymbol')

export interface PersonRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<PersonType.Input>, PersonType.Output> {}
