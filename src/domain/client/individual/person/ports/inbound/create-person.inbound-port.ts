import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/individual/person/types/person.type'

export const CreateContactPersonInboundPortToken = Symbol.for('CreateContactPersonInboundPortToken')

export interface CreateContactPersonInboundPort extends IServiceWithDataInboundPort<PersonType.Input, undefined, PersonType.Output> {}
