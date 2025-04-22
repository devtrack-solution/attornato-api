import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/legal/person/types/person.type'

export const CreateContactPersonLegalInboundPortToken = Symbol.for('CreateContactPersonLegalInboundPortToken')

export interface CreateContactPersonLegalInboundPort extends IServiceWithDataInboundPort<PersonType.Input, undefined, PersonType.Output> {}
