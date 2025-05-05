import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/list-judicial.inbound-port'
import { JudicialRepositoryOutboundPortSymbol, JudicialRepositoryOutboundPort } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'

@Injectable()
export class ListJudicialService implements ListJudicialInboundPort {
  constructor(
    @Inject(JudicialRepositoryOutboundPortSymbol)
    private readonly judicialRepository: JudicialRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<JudicialType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = [
      'client',
      'cnjNumber',
      'localProcedureName',
      'proceduralStatus',
      'county',
      'phase',
      'practiceArea',
      'responsible',
      'actionObject',
      'locator',
      'subject',
      'processFinancial.detail',
      'processFinancial.freeField1',
      'processFinancial.freeField2',
      'processFinancial.freeField6',
      'processFinancial.origin',
      'processFinancial.partner',
      'processFinancial.prognosis',
    ]
    const searchFields: string[] = [

    ]
    const order = { createdAt: 'ASC' }
    let result = await this.judicialRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  judicial  = result.data.map(( judicial ) =>  judicial  as JudicialType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  judicial ,
    }
  }
}
