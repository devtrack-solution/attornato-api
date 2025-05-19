import { Inject, Injectable } from '@nestjs/common'
import { ListPrognosisInboundPort } from '@/domain/process/component/prognosis/ports/inbound/list-prognosis.inbound-port'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { Prognosis } from '@/domain/process/component/prognosis/business-objects/prognosis.bo'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListPrognosisService implements ListPrognosisInboundPort {
  constructor(
    @Inject(PrognosisRepositoryOutboundPortSymbol)
    private readonly prognosisRepository: PrognosisRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<PrognosisType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.prognosisRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let prognosis = result.data.map((prognosis) => prognosis as PrognosisType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: prognosis,
    }
  }
}
