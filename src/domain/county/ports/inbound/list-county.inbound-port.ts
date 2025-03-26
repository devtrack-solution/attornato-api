import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { CountyType } from '../../types/county.type'

export const ListCountyInboundPortToken = Symbol.for('ListCountyInboundPortToken')

export interface ListCountyInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, CountyType.OutputPaginated> {}
