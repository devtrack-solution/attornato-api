import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalDataType } from '@/domain/legal/legal-data/types/legal-data.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchLegalDataInboundPortToken = Symbol.for('PatchLegalDataInboundPortToken')

export interface PatchLegalDataInboundPort extends IServiceInboundPort<Partial<LegalDataType.Input>, Criteria.ById, void> {}
