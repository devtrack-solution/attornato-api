import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ResponsibleType } from '../../types/responsible.type'

export const PatchResponsibleInboundPortToken = Symbol.for('PatchResponsibleInboundPortToken')

export interface PatchResponsibleInboundPort extends IServiceInboundPort<Partial<ResponsibleType.Input>, Criteria.ById, void> {}
