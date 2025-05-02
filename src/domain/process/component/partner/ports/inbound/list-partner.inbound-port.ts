import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PartnerType } from '@/domain/process/component/partner/types/partner.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListPartnerInboundPortToken = Symbol.for('ListPartnerInboundPortToken')

export interface ListPartnerInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PartnerType.OutputPaginated> {}
