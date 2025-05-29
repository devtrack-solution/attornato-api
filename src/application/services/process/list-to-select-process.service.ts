import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProcessType } from '@/domain/process/types/process.type'
import { ListToSelectProcessInboundPort } from '@/domain/process/ports/inbound/list-to-select-process.inbound-port'
import { ProcessRepositoryOutboundPort, ProcessRepositoryOutboundPortSymbol } from '@/domain/process/ports/outbound/process-repository.outbound-port'

@Injectable()
export class ListToSelectProcessService implements ListToSelectProcessInboundPort {
  constructor(
    @Inject(ProcessRepositoryOutboundPortSymbol)
    private readonly processRepository: ProcessRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<ProcessType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let process = await this.processRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return process.map((process) => process as ProcessType.Output)
  }
}
