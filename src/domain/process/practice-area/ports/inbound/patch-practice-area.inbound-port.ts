import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeAreaType } from '@/domain/process/practice-area/types/practice-area.type'

export const PatchPracticeAreaInboundPortToken = Symbol.for('PatchPracticeAreaInboundPortToken')

export interface PatchPracticeAreaInboundPort extends IServiceInboundPort<Partial<PracticeAreaType.Input>, Criteria.ById, void> {}
