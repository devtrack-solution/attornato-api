import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchPrognosisInboundPortToken = Symbol.for('PatchPrognosisInboundPortToken')

export interface PatchPrognosisInboundPort extends IServiceInboundPort<Partial<PrognosisType.Input>, Criteria.ById, void> {}
