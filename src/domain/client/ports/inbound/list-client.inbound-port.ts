import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListClientInboundPortToken = Symbol.for('ListClientInboundPortToken')

export interface ListClientInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, any> {}
