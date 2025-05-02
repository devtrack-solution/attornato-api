import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { OriginType } from '@/domain/process/component/origin/types/origin.type'

export const ListOriginInboundPortToken = Symbol.for('ListOriginInboundPortToken')

export interface ListOriginInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, OriginType.OutputPaginated> {}
