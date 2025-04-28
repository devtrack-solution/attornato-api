import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailsType } from '@/domain/process/details/types/details.type'

export const ListToSelectDetailsInboundPortToken = Symbol.for('ListToSelectDetailsInboundPortToken')

export interface ListToSelectDetailsInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<DetailsType.Output[]>> {}
