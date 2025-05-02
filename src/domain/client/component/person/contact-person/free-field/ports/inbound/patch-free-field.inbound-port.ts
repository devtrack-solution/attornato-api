import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'

export const PatchFreeFieldInboundPortToken = Symbol.for('PatchFreeFieldInboundPortToken')

export interface PatchFreeFieldInboundPort extends IServiceInboundPort<Partial<FreeFieldType.Input>, Criteria.ById, void> {}
