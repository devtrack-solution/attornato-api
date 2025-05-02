import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { JudicialType } from '../../types/judicial.type'

export const PatchJudicialInboundPortToken = Symbol.for('PatchJudicialInboundPortToken')

export interface PatchJudicialInboundPort extends IServiceInboundPort<Partial<JudicialType.Input>, Criteria.ById, void> {}
