import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { CountyType } from '../../types/county.type'

export const ListToSelectCountyInboundPortToken = Symbol.for('ListToSelectCountyInboundPortToken')

export interface ListToSelectCountyInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<CountyType.Output[]>> {}
