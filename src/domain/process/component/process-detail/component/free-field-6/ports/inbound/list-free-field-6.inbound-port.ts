import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

export const ListFreeField6InboundPortToken = Symbol.for('ListFreeField6InboundPortToken')

export interface ListFreeField6InboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, FreeField6Type.OutputPaginated> {}
