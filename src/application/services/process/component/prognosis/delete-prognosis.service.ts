import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeletePrognosisInboundPort } from '@/domain/process/component/prognosis/ports/inbound/delete-prognosis.inbound-port'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'

@Injectable()
export class DeletePrognosisService implements DeletePrognosisInboundPort {
  constructor(
    @Inject(PrognosisRepositoryOutboundPortSymbol)
    private readonly prognosisRepository: PrognosisRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.prognosisRepository.deleteObject(criteria.id)
  }
}
