import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'

export const ListFreeField1InboundPortToken = Symbol.for('ListFreeField1InboundPortToken')

export interface ListFreeField1InboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, FreeField1Type.OutputPaginated> {}
