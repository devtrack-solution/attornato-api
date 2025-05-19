import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectPrognosisInboundPort } from '@/domain/process/component/prognosis/ports/inbound/list-to-select-prognosis.inbound-port'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { Prognosis } from '@/domain/process/component/prognosis/business-objects/prognosis.bo'

@Injectable()
export class ListToSelectPrognosisService implements ListToSelectPrognosisInboundPort {
  constructor(
    @Inject(PrognosisRepositoryOutboundPortSymbol)
    private readonly prognosisRepository: PrognosisRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<PrognosisType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let prognosis = await this.prognosisRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return prognosis.map((prognosis) => new Prognosis(prognosis as PrognosisType.Output).toJson())
  }
}
