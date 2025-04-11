import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactType } from '@/domain/contact/types/contact.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchContactInboundPortToken = Symbol.for('PatchContactInboundPortToken')

export interface PatchContactInboundPort extends IServiceInboundPort<Partial<ContactType.Input>, Criteria.ById, void> {}
