import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Judicial } from '@/domain/process/component/judicial/business-objects/judicial.bo'
import { ListToSelectJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/list-to-select-judicial.inbound-port'
import { JudicialRepositoryOutboundPortSymbol, JudicialRepositoryOutboundPort } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'

@Injectable()
export class ListToSelectJudicialService implements ListToSelectJudicialInboundPort {
  constructor(
    @Inject(JudicialRepositoryOutboundPortSymbol)
    private readonly judicialRepository: JudicialRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<JudicialType.Output[]>> {
    const select: string[] = ['id', 'processNumber']
    const searchFields: string[] = ['processNumber']
    const order = { processNumber: 'ASC' }
    let judicial = await this.judicialRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return judicial.map((judicial) => judicial as JudicialType.Output)
  }
}
