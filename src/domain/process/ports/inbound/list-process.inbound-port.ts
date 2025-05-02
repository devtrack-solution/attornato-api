import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessType } from '@/domain/process/types/process.type'

export const ListProcessInboundPortToken = Symbol.for('ListProcessInboundPortToken')

export interface ListProcessInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ProcessType.OutputPaginated> {}
