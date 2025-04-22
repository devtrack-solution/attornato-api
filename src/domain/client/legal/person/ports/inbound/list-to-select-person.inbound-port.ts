import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/legal/person/types/person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectContactPersonLegalInboundPortToken = Symbol.for('ListToSelectContactPersonLegalInboundPortToken')

export interface ListToSelectContactPersonLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PersonType.Output[]>> {}
