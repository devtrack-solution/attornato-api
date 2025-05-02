import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'

export const PatchDetailInboundPortToken = Symbol.for('PatchDetailInboundPortToken')

export interface PatchDetailInboundPort extends IServiceInboundPort<Partial<DetailType.Input>, Criteria.ById, void> {}
