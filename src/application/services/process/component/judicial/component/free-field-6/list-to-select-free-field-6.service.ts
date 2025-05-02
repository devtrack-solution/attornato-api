import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField6RepositoryOutboundPort, FreeField6RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-6/ports/outbound/free-field-6-repository.outbound-port'
import { ListToSelectFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/list-to-select-free-field-6.inbound-port'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'
import { FreeField6 } from '@/domain/process/component/process-detail/component/free-field-6/business-objects/free-field-6.bo'

@Injectable()
export class ListToSelectFreeField6Service implements ListToSelectFreeField6InboundPort {
  constructor(
    @Inject(FreeField6RepositoryOutboundPortSymbol)
    private readonly freeField6Repository: FreeField6RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<FreeField6Type.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let freeField6 = await this.freeField6Repository.findForSelectByCriteria(criteria, order, select, searchFields)
    return freeField6.map((freeField6) => new FreeField6(freeField6 as FreeField6Type.Output).toJson())
  }
}
