import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Responsible } from '@/domain/process/component/responsible/business-objects/responsible.bo'
import { ListToSelectResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/list-to-select-responsible.inbound-port'
import { ResponsibleRepositoryOutboundPortSymbol, ResponsibleRepositoryOutboundPort } from '@/domain/process/component/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleType } from '@/domain/process/component/responsible/types/responsible.type'

@Injectable()
export class ListToSelectResponsibleService implements ListToSelectResponsibleInboundPort {
  constructor(
    @Inject(ResponsibleRepositoryOutboundPortSymbol)
    private readonly responsibleRepository: ResponsibleRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<ResponsibleType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let responsible = await this.responsibleRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return responsible.map((responsible) => new Responsible(responsible as ResponsibleType.Output).toJson())
  }
}
