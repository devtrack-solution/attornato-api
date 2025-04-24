import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonType } from '@/domain/client/individual/contact-person/types/contact-person.type'

export const CreateContactPersonInboundPortToken = Symbol.for('CreateContactPersonInboundPortToken')

export interface CreateContactPersonInboundPort extends IServiceWithDataInboundPort<ContactPersonType.Input, undefined, ContactPersonType.Output> {}
