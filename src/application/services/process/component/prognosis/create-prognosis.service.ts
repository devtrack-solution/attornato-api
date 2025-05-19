import { Inject, Injectable } from '@nestjs/common'
import { CreatePrognosisInboundPort } from '@/domain/process/component/prognosis/ports/inbound/create-prognosis.inbound-port'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { Prognosis } from '@/domain/process/component/prognosis/business-objects/prognosis.bo'

@Injectable()
export class CreatePrognosisService implements CreatePrognosisInboundPort {
  constructor(
    @Inject(PrognosisRepositoryOutboundPortSymbol)
    private readonly prognosisRepository: PrognosisRepositoryOutboundPort,
  ) {}

  async execute(data: PrognosisType.Input): Promise<PrognosisType.Output> {
    let prognosis = new Prognosis(data)
    await this.prognosisRepository.saveObject(prognosis.toPersistence())
    return prognosis.toJson()
  }
}
