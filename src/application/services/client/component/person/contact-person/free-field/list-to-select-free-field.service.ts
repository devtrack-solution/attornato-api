import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'
import { ListToSelectFreeFieldInboundPort } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/list-to-select-free-field.inbound-port'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { FreeField } from '@/domain/client/component/person/contact-person/free-field/business-objects/free-field.bo'

@Injectable()
export class ListToSelectFreeFieldService implements ListToSelectFreeFieldInboundPort {
  constructor(
    @Inject(FreeFieldRepositoryOutboundPortSymbol)
    private readonly freeFieldRepository: FreeFieldRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<FreeFieldType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let freeField = await this.freeFieldRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return freeField.map((freeField) => new FreeField(freeField as FreeFieldType.Output).toJson())
  }
}
