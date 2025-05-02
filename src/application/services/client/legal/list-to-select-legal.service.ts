import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/list-to-select-legal.inbound-port'
import { LegalRepositoryOutboundPortSymbol, LegalRepositoryOutboundPort } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { LegalType } from '@/domain/client/component/legal/types/legal.type'
import { Legal } from '@/domain/client/component/legal/business-objects/legal.bo'

@Injectable()
export class ListToSelectLegalService implements ListToSelectLegalInboundPort {
  constructor(
    @Inject(LegalRepositoryOutboundPortSymbol)
    private readonly legalRepository: LegalRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<LegalType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  legal  = await this.legalRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  legal.map(( legal ) => new Legal( legal  as LegalType.Output).toJson())
  }
}
