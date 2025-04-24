import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectIndividualInboundPort } from '@/domain/client/individual/ports/inbound/list-to-select-individual.inbound-port'
import { IndividualRepositoryOutboundPortSymbol, IndividualRepositoryOutboundPort } from '@/domain/client/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualType } from '@/domain/client/individual/types/individual.type'
import { Individual } from '@/domain/client/individual/business-objects/individual.bo'

@Injectable()
export class ListToSelectIndividualService implements ListToSelectIndividualInboundPort {
  constructor(
    @Inject(IndividualRepositoryOutboundPortSymbol)
    private readonly individualRepository: IndividualRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<IndividualType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  individual  = await this.individualRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  individual.map(( individual ) => new Individual( individual  as IndividualType.Output).toJson())
  }
}
