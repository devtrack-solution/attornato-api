import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupProcessType } from '@/domain/group-process/types/group-process.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectGroupProcessInboundPortToken = Symbol.for('ListToSelectGroupProcessInboundPortToken')

export interface ListToSelectGroupProcessInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<GroupProcessType.Output[]>> {}
