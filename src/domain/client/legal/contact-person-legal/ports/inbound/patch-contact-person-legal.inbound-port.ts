import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactPersonLegalType } from '@/domain/client/legal/contact-person-legal/types/contact-person-legal.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchContactPersonLegalInboundPortToken = Symbol.for('PatchContactPersonLegalInboundPortToken')

export interface PatchContactPersonLegalInboundPort extends IServiceInboundPort<Partial<ContactPersonLegalType.Input>, Criteria.ById, void> {}
