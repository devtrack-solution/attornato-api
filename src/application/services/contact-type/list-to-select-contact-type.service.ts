import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectContactTypeInboundPort } from '@/domain/contact-type/ports/inbound/list-to-select-contact-type.inbound-port'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { ContactType } from '@/domain/contact-type/business-objects/contact-type.bo'

@Injectable()
export class ListToSelectContactTypeService implements ListToSelectContactTypeInboundPort {
  constructor(
    @Inject(ContactTypeRepositoryOutboundPortSymbol)
    private readonly contactTypeRepository: ContactTypeRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<ContactTypeType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  contactType  = await this.contactTypeRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  contactType .map(( contactType ) => new ContactType( contactType  as ContactTypeType.Output).toJson())
  }
}
