import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PartnerType } from '@/domain/process/component/partner/types/partner.type'

export const CreatePartnerInboundPortToken = Symbol.for('CreatePartnerInboundPortToken')

export interface CreatePartnerInboundPort extends IServiceWithDataInboundPort<PartnerType.Input, undefined, PartnerType.Output> {}
