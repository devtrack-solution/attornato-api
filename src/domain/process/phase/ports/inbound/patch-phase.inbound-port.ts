import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PhaseType } from '../../types/phase.type'

export const PatchPhaseInboundPortToken = Symbol.for('PatchPhaseInboundPortToken')

export interface PatchPhaseInboundPort extends IServiceInboundPort<Partial<PhaseType.Input>, Criteria.ById, void> {}
