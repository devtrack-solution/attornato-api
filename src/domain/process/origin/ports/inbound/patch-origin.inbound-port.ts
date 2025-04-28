import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { OriginType } from '@/domain/process/origin/types/origin.type'

export const PatchOriginInboundPortToken = Symbol.for('PatchOriginInboundPortToken')

export interface PatchOriginInboundPort extends IServiceInboundPort<Partial<OriginType.Input>, Criteria.ById, void> {}
