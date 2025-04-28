import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectCountyInboundPort } from '@/domain/process/county/ports/inbound/list-to-select-county.inbound-port'
import { CountyRepositoryOutboundPortSymbol, CountyRepositoryOutboundPort } from '@/domain/process/county/ports/outbound/county-repository.outbound-port'
import { CountyType } from '@/domain/process/county/types/county.type'
import { County } from '@/domain/process/county/business-objects/county.bo'

@Injectable()
export class ListToSelectCountyService implements ListToSelectCountyInboundPort {
  constructor(
    @Inject(CountyRepositoryOutboundPortSymbol)
    private readonly CountyRepository: CountyRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<CountyType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  county  = await this.CountyRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  county .map(( county ) => new County( county  as CountyType.Output).toJson())
  }
}
