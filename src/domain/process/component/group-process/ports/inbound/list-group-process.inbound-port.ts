import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListGroupProcessInboundPortToken = Symbol.for('ListGroupProcessInboundPortToken')

export interface ListGroupProcessInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, GroupProcessType.OutputPaginated> {}
