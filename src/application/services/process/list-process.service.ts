import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessRepositoryOutboundPort, ProcessRepositoryOutboundPortSymbol } from '@/domain/process/ports/outbound/process-repository.outbound-port'
import { ListProcessInboundPort } from '@/domain/process/ports/inbound/list-process.inbound-port'
import { ProcessType } from '@/domain/process/types/process.type'

@Injectable()
export class ListProcessService implements ListProcessInboundPort {
  constructor(
    @Inject(ProcessRepositoryOutboundPortSymbol)
    private readonly processRepository: ProcessRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<ProcessType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = [
      'client',
      'localProcedureName',
      'proceduralStatus',
      'county',
      'phase',
      'practiceArea',
      'responsible',
      'actionObject',
      'locator',
      'subject',
      'processFinancial',
      'processDetail',
      'processDetail.detail',
      'processDetail.freeField1',
      'processDetail.freeField2',
      'processDetail.freeField6',
      'processDetail.origin',
      'processDetail.partner',
      'processDetail.prognosis',
    ]
    const searchFields: string[] = ['folder', 'processNumber', 'client.companyName', 'client.name']
    const order = { createdAt: 'ASC' }
    let result = await this.processRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let process = result.data.map((process) => process as ProcessType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: process,
    }
  }
}
