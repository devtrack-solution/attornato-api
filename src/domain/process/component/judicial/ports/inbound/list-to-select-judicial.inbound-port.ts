import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { JudicialType } from '../../types/judicial.type'

export const ListToSelectJudicialInboundPortToken = Symbol.for('ListToSelectJudicialInboundPortToken')

export interface ListToSelectJudicialInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<JudicialType.Output[]>> {}
