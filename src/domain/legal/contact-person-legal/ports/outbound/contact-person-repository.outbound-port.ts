import { ContactPersonLegalType } from '@/domain/legal/contact-person-legal/types/contact-person-legal.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ContactPersonLegalRepositoryOutboundPortSymbol = Symbol('ContactPersonLegalRepositoryOutboundPortSymbol')

export interface ContactPersonLegalRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<ContactPersonLegalType.Input>, ContactPersonLegalType.Output> {}
