import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'

export const CreateGroupCustomerInboundPortToken = Symbol.for('CreateGroupCustomerInboundPortToken')

export interface CreateGroupCustomerInboundPort extends IServiceWithDataInboundPort<GroupCustomerType.Input, undefined, GroupCustomerType.Output> {}
