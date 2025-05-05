import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AdministrativeType } from '../../types/administrative.type'

export const ListAdministrativeInboundPortToken = Symbol.for('ListAdministrativeInboundPortToken')

export interface ListAdministrativeInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, AdministrativeType.OutputPaginated> {}
