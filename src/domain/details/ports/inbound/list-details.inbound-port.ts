import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailsType } from '@/domain/details/types/details.type'

export const ListDetailsInboundPortToken = Symbol.for('ListDetailsInboundPortToken')

export interface ListDetailsInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, DetailsType.OutputPaginated> {}
