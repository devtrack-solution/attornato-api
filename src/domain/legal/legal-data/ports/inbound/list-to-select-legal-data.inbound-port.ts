import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalDataType } from '@/domain/legal/legal-data/types/legal-data.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectLegalDataInboundPortToken = Symbol.for('ListToSelectLegalDataInboundPortToken')

export interface ListToSelectLegalDataInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<LegalDataType.Output[]>> {}
