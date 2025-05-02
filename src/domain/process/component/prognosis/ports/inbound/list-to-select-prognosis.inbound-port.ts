import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectPrognosisInboundPortToken = Symbol.for('ListToSelectPrognosisInboundPortToken')

export interface ListToSelectPrognosisInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PrognosisType.Output[]>> {}
