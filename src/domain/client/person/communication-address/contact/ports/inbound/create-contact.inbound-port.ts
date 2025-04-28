import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactType } from '../../types/contact.type'

export const CreateContactInboundPortToken = Symbol.for('CreateContactInboundPortToken')

export interface CreateContactInboundPort extends IServiceWithDataInboundPort<ContactType.Input, undefined, ContactType.Output> {}
