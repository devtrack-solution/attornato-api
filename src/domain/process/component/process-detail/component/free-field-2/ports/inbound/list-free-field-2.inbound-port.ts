import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'

export const ListFreeField2InboundPortToken = Symbol.for('ListFreeField2InboundPortToken')

export interface ListFreeField2InboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, FreeField2Type.OutputPaginated> {}
