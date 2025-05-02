import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessDetailType } from '../../types/process-detail.type'

export const ListProcessDetailInboundPortToken = Symbol.for('ListProcessDetailInboundPortToken')

export interface ListProcessDetailInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ProcessDetailType.OutputPaginated> {}
