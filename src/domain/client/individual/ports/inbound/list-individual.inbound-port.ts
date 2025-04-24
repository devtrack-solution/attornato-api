import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { IndividualType } from '@/domain/client/individual/types/individual.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListIndividualInboundPortToken = Symbol.for('ListIndividualInboundPortToken')

export interface ListIndividualInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, IndividualType.OutputPaginated> {}
