import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PhaseType } from '../../types/phase.type'

export const ListPhaseInboundPortToken = Symbol.for('ListPhaseInboundPortToken')

export interface ListPhaseInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PhaseType.OutputPaginated> {}
