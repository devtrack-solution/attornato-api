import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { CountyType } from '../../types/county.type'

export const PatchCountyInboundPortToken = Symbol.for('PatchCountyInboundPortToken')

export interface PatchCountyInboundPort extends IServiceInboundPort<Partial<CountyType.Input>, Criteria.ById, void> {}
