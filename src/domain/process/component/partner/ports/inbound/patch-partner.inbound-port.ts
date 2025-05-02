import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PartnerType } from '@/domain/process/component/partner/types/partner.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchPartnerInboundPortToken = Symbol.for('PatchPartnerInboundPortToken')

export interface PatchPartnerInboundPort extends IServiceInboundPort<Partial<PartnerType.Input>, Criteria.ById, void> {}
