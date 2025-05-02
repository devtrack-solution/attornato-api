import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'

export const CreatePracticeAreaInboundPortToken = Symbol.for('CreatePracticeAreaInboundPortToken')

export interface CreatePracticeAreaInboundPort extends IServiceWithDataInboundPort<PracticeAreaType.Input, undefined, PracticeAreaType.Output> {}
