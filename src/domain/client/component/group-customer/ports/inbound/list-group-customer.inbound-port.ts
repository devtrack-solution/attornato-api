import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListGroupCustomerInboundPortToken = Symbol.for('ListGroupCustomerInboundPortToken')

export interface ListGroupCustomerInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, GroupCustomerType.OutputPaginated> {}
