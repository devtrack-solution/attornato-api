import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'

export const ListDetailInboundPortToken = Symbol.for('ListDetailInboundPortToken')

export interface ListDetailInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, DetailType.OutputPaginated> {}
