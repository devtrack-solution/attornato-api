import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProceduralStatusType } from '@/domain/process/procedural-status/types/procedural-status.type'

export const CreateProceduralStatusInboundPortToken = Symbol.for('CreateProceduralStatusInboundPortToken')

export interface CreateProceduralStatusInboundPort extends IServiceWithDataInboundPort<ProceduralStatusType.Input, undefined, ProceduralStatusType.Output> {}
