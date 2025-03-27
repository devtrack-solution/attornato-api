import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObjectType } from '@/domain/action-object/types/action-object.type'

export const ListActionObjectInboundPortToken = Symbol.for('ListActionObjectInboundPortToken')

export interface ListActionObjectInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ActionObjectType.OutputPaginated> {}
