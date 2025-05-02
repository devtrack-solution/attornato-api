import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { IndividualType } from '@/domain/client/component/individual/types/individual.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectIndividualInboundPortToken = Symbol.for('ListToSelectIndividualInboundPortToken')

export interface ListToSelectIndividualInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<IndividualType.Output[]>> {}
