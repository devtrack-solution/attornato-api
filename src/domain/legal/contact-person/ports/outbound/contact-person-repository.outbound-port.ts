import { ContactPersonType } from '@/domain/legal/contact-person/types/contact-person.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ContactPersonRepositoryOutboundPortSymbol = Symbol('ContactPersonRepositoryOutboundPortSymbol')

export interface ContactPersonRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ContactPersonType.Input, ContactPersonType.Output> {}
