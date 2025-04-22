import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalType } from '@/domain/client/legal/types/legal.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectLegalInboundPortToken = Symbol.for('ListToSelectLegalInboundPortToken')

export interface ListToSelectLegalInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<LegalType.Output[]>> {}
