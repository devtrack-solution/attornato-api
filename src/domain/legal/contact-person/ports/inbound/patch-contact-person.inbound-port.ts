import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonType } from '@/domain/legal/contact-person/types/contact-person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchContactPersonInboundPortToken = Symbol.for('PatchContactPersonInboundPortToken')

export interface PatchContactPersonInboundPort extends IServiceInboundPort<Partial<ContactPersonType.Input>, Criteria.ById, void> {}
