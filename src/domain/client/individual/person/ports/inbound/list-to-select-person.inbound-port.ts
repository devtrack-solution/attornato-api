import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PersonType } from '@/domain/client/individual/person/types/person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectContactPersonInboundPortToken = Symbol.for('ListToSelectContactPersonInboundPortToken')

export interface ListToSelectContactPersonInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PersonType.Output[]>> {}
