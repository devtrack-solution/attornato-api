import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { OriginType } from '@/domain/origin/types/origin.type'

export const ListToSelectOriginInboundPortToken = Symbol.for('ListToSelectOriginInboundPortToken')

export interface ListToSelectOriginInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<OriginType.Output[]>> {}
