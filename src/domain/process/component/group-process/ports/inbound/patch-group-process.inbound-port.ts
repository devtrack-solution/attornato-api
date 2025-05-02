import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchGroupProcessInboundPortToken = Symbol.for('PatchGroupProcessInboundPortToken')

export interface PatchGroupProcessInboundPort extends IServiceInboundPort<Partial<GroupProcessType.Input>, Criteria.ById, void> {}
