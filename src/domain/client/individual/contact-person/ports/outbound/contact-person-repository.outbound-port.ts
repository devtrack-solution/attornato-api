import { ContactPersonType } from '@/domain/client/individual/contact-person/types/contact-person.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ContactPersonRepositoryOutboundPortSymbol = Symbol('ContactPersonRepositoryOutboundPortSymbol')

export interface ContactPersonRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<ContactPersonType.Input>, ContactPersonType.Output> {}
