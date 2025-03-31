import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupCustomerType } from '@/domain/todo/types/group-customer.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchGroupCustomerInboundPortToken = Symbol.for('PatchGroupCustomerInboundPortToken')

export interface PatchGroupCustomerInboundPort extends IServiceInboundPort<Partial<GroupCustomerType.Input>, Criteria.ById, void> {}
