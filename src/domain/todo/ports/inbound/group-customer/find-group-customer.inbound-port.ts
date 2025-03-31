import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const FindGroupCustomerInboundPortToken = Symbol.for('FindGroupCustomerInboundPortToken')

export interface FindGroupCustomerInboundPort extends IServiceInboundPort<GroupCustomerType.Input, Criteria.ById, GroupCustomerType.Output> {}
