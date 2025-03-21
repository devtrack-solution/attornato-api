import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ResponsibleType } from '../../types/responsible.type'

export const ListResponsibleInboundPortToken = Symbol.for('ListResponsibleInboundPortToken')

export interface ListResponsibleInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ResponsibleType.OutputPaginated> {}
