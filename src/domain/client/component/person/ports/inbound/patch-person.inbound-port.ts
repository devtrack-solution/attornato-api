import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/component/person/types/person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchContactPersonInboundPortToken = Symbol.for('PatchContactPersonInboundPortToken')

export interface PatchContactPersonInboundPort extends IServiceInboundPort<Partial<PersonType.Input>, Criteria.ById, void> {}
