import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonLegalType } from '@/domain/client/legal/contact-person-legal/types/contact-person-legal.type'

export const CreateContactPersonLegalInboundPortToken = Symbol.for('CreateContactPersonLegalInboundPortToken')

export interface CreateContactPersonLegalInboundPort extends IServiceWithDataInboundPort<ContactPersonLegalType.Input, undefined, ContactPersonLegalType.Output> {}
