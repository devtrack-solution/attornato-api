import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'

export const CreateContactTypeInboundPortToken = Symbol.for('CreateContactTypeInboundPortToken')

export interface CreateContactTypeInboundPort extends IServiceWithDataInboundPort<ContactTypeType.Input, undefined, ContactTypeType.Output> {}
