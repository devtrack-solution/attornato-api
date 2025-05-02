import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { JudicialType } from '../../types/judicial.type'

export const ListJudicialInboundPortToken = Symbol.for('ListJudicialInboundPortToken')

export interface ListJudicialInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, JudicialType.OutputPaginated> {}
