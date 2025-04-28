import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupCustomerType } from '@/domain/client/group-customer/types/group-customer.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectGroupCustomerInboundPortToken = Symbol.for('ListToSelectGroupCustomerInboundPortToken')

export interface ListToSelectGroupCustomerInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<GroupCustomerType.Output[]>> {}
