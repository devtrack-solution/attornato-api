import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'

export const ListToSelectPracticeAreaInboundPortToken = Symbol.for('ListToSelectPracticeAreaInboundPortToken')

export interface ListToSelectPracticeAreaInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<PracticeAreaType.Output[]>> {}
