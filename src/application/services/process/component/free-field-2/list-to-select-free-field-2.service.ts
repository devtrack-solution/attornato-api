import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField2RepositoryOutboundPort, FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'
import { ListToSelectFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/list-to-select-free-field-2.inbound-port'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'
import { FreeField2 } from '@/domain/process/component/process-detail/component/free-field-2/business-objects/free-field-2.bo'

@Injectable()
export class ListToSelectFreeField2Service implements ListToSelectFreeField2InboundPort {
  constructor(
    @Inject(FreeField2RepositoryOutboundPortSymbol)
    private readonly freeField2Repository: FreeField2RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<FreeField2Type.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let freeField2 = await this.freeField2Repository.findForSelectByCriteria(criteria, order, select, searchFields)
    return freeField2.map((freeField2) => new FreeField2(freeField2 as FreeField2Type.Output).toJson())
  }
}
