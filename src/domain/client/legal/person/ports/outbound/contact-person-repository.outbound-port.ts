import { PersonType } from '@/domain/client/legal/person/types/person.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ContactPersonLegalRepositoryOutboundPortSymbol = Symbol('ContactPersonLegalRepositoryOutboundPortSymbol')

export interface ContactPersonLegalRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<PersonType.Input>, PersonType.Output> {}
