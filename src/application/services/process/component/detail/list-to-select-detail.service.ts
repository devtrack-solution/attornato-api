import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectDetailInboundPort } from '@/domain/process/component/detail/ports/inbound/list-to-select-detail.inbound-port'
import { DetailRepositoryOutboundPort, DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'
import { Detail } from '@/domain/process/component/detail/business-objects/detail.bo'

@Injectable()
export class ListToSelectDetailService implements ListToSelectDetailInboundPort {
  constructor(
    @Inject(DetailRepositoryOutboundPortSymbol)
    private readonly detailRepository: DetailRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<DetailType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let detail = await this.detailRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return detail.map((detail) => new Detail(detail as DetailType.Output).toJson())
  }
}
