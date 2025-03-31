import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { GroupCustomerType } from '@/domain/todo/types/group-customer.type'

export const UpdateGroupCustomerInboundPortToken = Symbol.for('UpdateGroupCustomerInboundPortToken')

export interface UpdateGroupCustomerInboundPort extends IServiceInboundPort<GroupCustomerType.Input, Criteria.FindBy, GroupCustomerType.Output> {}
