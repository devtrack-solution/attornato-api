import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalType } from '@/domain/legal/types/legal.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchLegalInboundPortToken = Symbol.for('PatchLegalInboundPortToken')

export interface PatchLegalInboundPort extends IServiceInboundPort<Partial<LegalType.Input>, Criteria.ById, void> {}
