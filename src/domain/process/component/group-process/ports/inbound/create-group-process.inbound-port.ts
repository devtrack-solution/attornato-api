import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'

export const CreateGroupProcessInboundPortToken = Symbol.for('CreateGroupProcessInboundPortToken')

export interface CreateGroupProcessInboundPort extends IServiceWithDataInboundPort<GroupProcessType.Input, undefined, GroupProcessType.Output> {}
