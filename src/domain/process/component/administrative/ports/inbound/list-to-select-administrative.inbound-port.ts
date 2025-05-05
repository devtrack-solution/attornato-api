import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AdministrativeType } from '../../types/administrative.type'

export const ListToSelectAdministrativeInboundPortToken = Symbol.for('ListToSelectAdministrativeInboundPortToken')

export interface ListToSelectAdministrativeInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<AdministrativeType.Output[]>> {}
