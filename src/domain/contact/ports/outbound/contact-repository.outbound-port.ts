import { ContactType } from '@/domain/contact/types/contact.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ContactRepositoryOutboundPortSymbol = Symbol('ContactRepositoryOutboundPortSymbol')

export interface ContactRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ContactType.Input, ContactType.Output> {}
