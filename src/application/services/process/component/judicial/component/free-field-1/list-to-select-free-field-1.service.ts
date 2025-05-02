import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField1RepositoryOutboundPort, FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'
import { ListToSelectFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/list-to-select-free-field-1.inbound-port'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'
import { FreeField1 } from '@/domain/process/component/process-detail/component/free-field-1/business-objects/free-field-1.bo'

@Injectable()
export class ListToSelectFreeField1Service implements ListToSelectFreeField1InboundPort {
  constructor(
    @Inject(FreeField1RepositoryOutboundPortSymbol)
    private readonly freeField1Repository: FreeField1RepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<FreeField1Type.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let freeField1 = await this.freeField1Repository.findForSelectByCriteria(criteria, order, select, searchFields)
    return freeField1.map((freeField1) => new FreeField1(freeField1 as FreeField1Type.Output).toJson())
  }
}
