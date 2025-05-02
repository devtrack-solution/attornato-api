import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PartnerType } from '@/domain/process/component/partner/types/partner.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectPartnerInboundPortToken = Symbol.for('ListToSelectPartnerInboundPortToken')

export interface ListToSelectPartnerInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PartnerType.Output[]>> {}
