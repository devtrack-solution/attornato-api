import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PhaseType } from '../../types/phase.type'

export const CreatePhaseInboundPortToken = Symbol.for('CreatePhaseInboundPortToken')

export interface CreatePhaseInboundPort extends IServiceWithDataInboundPort<PhaseType.Input, undefined, PhaseType.Output> {}
