import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'

export const CreatePrognosisInboundPortToken = Symbol.for('CreatePrognosisInboundPortToken')

export interface CreatePrognosisInboundPort extends IServiceWithDataInboundPort<PrognosisType.Input, undefined, PrognosisType.Output> {}
