import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { OriginType } from '@/domain/origin/types/origin.type'
import { ListToSelectOriginInboundPort } from '@/domain/origin/ports/inbound/list-to-select-origin.inbound-port'
import {
  OriginRepositoryOutboundPort,
  OriginRepositoryOutboundPortSymbol,
} from '@/domain/origin/ports/outbound/origin-repository.outbound-port'
import { Origin } from '@/domain/origin/business-objects/origin.bo'

@Injectable()
export class ListToSelectOriginService implements ListToSelectOriginInboundPort {
  constructor(
    @Inject(OriginRepositoryOutboundPortSymbol)
    private readonly originRepository: OriginRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<OriginType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  origin  = await this.originRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  origin .map(( origin ) => new Origin( origin  as OriginType.Output).toJson())
  }
}
