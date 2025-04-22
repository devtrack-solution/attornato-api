import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalType } from '@/domain/client/legal/types/legal.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListLegalInboundPortToken = Symbol.for('ListLegalInboundPortToken')

export interface ListLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, LegalType.OutputPaginated> {}
