import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const GroupCustomerRepositoryOutboundPortSymbol = Symbol('GroupCustomerRepositoryOutboundPortSymbol')

export interface GroupCustomerRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, GroupCustomerType.Input, GroupCustomerType.Output> {}
