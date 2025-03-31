import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchContactTypeInboundPortToken = Symbol.for('PatchContactTypeInboundPortToken')

export interface PatchContactTypeInboundPort extends IServiceInboundPort<Partial<ContactTypeType.Input>, Criteria.ById, void> {}
