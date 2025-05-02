import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'

export const CreateActionObjectInboundPortToken = Symbol.for('CreateActionObjectInboundPortToken')

export interface CreateActionObjectInboundPort extends IServiceWithDataInboundPort<ActionObjectType.Input, undefined, ActionObjectType.Output> {}
