import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'

export const PatchActionObjectInboundPortToken = Symbol.for('PatchActionObjectInboundPortToken')

export interface PatchActionObjectInboundPort extends IServiceInboundPort<Partial<ActionObjectType.Input>, Criteria.ById, void> {}
