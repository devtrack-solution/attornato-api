import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/legal/person/types/person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchContactPersonLegalInboundPortToken = Symbol.for('PatchContactPersonLegalInboundPortToken')

export interface PatchContactPersonLegalInboundPort extends IServiceInboundPort<Partial<PersonType.Input>, Criteria.ById, void> {}
