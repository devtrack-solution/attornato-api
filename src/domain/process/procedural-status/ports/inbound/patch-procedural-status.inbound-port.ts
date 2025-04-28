import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProceduralStatusType } from '@/domain/process/procedural-status/types/procedural-status.type'

export const PatchProceduralStatusInboundPortToken = Symbol.for('PatchProceduralStatusInboundPortToken')

export interface PatchProceduralStatusInboundPort extends IServiceInboundPort<Partial<ProceduralStatusType.Input>, Criteria.ById, void> {}
