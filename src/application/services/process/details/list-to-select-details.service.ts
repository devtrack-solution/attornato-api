import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectDetailsInboundPort } from '@/domain/process/details/ports/inbound/list-to-select-details.inbound-port'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/process/details/ports/outbound/details-repository.outbound-port'
import { DetailsType } from '@/domain/process/details/types/details.type'
import { Details } from '@/domain/process/details/business-objects/details.bo'

@Injectable()
export class ListToSelectDetailsService implements ListToSelectDetailsInboundPort {
  constructor(
    @Inject(DetailsRepositoryOutboundPortSymbol)
    private readonly detailsRepository: DetailsRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<DetailsType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  details  = await this.detailsRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  details .map(( details ) => new Details( details  as DetailsType.Output).toJson())
  }
}
