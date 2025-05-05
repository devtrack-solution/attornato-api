import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AdministrativeType } from '../../types/administrative.type'

export const PatchAdministrativeInboundPortToken = Symbol.for('PatchAdministrativeInboundPortToken')

export interface PatchAdministrativeInboundPort extends IServiceInboundPort<Partial<AdministrativeType.Input>, Criteria.ById, void> {}
