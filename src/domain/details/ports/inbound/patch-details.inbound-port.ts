import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailsType } from '@/domain/details/types/details.type'

export const PatchDetailsInboundPortToken = Symbol.for('PatchDetailsInboundPortToken')

export interface PatchDetailsInboundPort extends IServiceInboundPort<Partial<DetailsType.Input>, Criteria.ById, void> {}
