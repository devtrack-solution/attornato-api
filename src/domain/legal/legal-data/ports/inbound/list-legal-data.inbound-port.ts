import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalDataType } from '@/domain/legal/legal-data/types/legal-data.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListLegalDataInboundPortToken = Symbol.for('ListLegalDataInboundPortToken')

export interface ListLegalDataInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, LegalDataType.OutputPaginated> {}
