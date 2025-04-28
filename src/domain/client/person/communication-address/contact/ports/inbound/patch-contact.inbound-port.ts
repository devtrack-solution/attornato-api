import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ContactType } from '../../types/contact.type'

export const PatchContactInboundPortToken = Symbol.for('PatchContactInboundPortToken')

export interface PatchContactInboundPort extends IServiceInboundPort<Partial<ContactType.Input>, Criteria.ById, void> {}
