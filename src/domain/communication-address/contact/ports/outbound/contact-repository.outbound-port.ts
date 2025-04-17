import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ContactType } from '../../types/contact.type'

export const ContactRepositoryOutboundPortSymbol = Symbol('ContactRepositoryOutboundPortSymbol')

export interface ContactRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<ContactType.Input>, ContactType.Output> {}
