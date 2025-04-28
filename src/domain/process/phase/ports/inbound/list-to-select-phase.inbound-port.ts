import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PhaseType } from '../../types/phase.type'

export const ListToSelectPhaseInboundPortToken = Symbol.for('ListToSelectPhaseInboundPortToken')

export interface ListToSelectPhaseInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PhaseType.Output[]>> {}
