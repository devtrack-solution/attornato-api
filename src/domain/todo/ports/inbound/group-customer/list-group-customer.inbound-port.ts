import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListGroupCustomerInboundPortToken = Symbol.for('ListGroupCustomerInboundPortToken')

export interface ListGroupCustomerInboundPort extends IServiceInboundPort<GroupCustomerType.Input, Criteria.FindBy, GroupCustomerType.Output> {}
