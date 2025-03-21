import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ResponsibleType } from '../../types/responsible.type'

export const ListToSelectResponsibleInboundPortToken = Symbol.for('ListToSelectResponsibleInboundPortToken')

export interface ListToSelectResponsibleInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ResponsibleType.Output[]>> {}
