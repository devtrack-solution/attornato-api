import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ContactTypeRepositoryOutboundPortSymbol = Symbol('ContactTypeRepositoryOutboundPortSymbol')

export interface ContactTypeRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ContactTypeType.Input, ContactTypeType.Output> {}
