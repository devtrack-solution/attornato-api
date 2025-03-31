import { Inject, Injectable } from '@nestjs/common'
import { ListContactTypeInboundPort } from '@/domain/contact-type/ports/inbound/list-contact-type.inbound-port'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { ContactType } from '@/domain/contact-type/business-objects/contact-type.bo'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListContactTypeService implements ListContactTypeInboundPort {
  constructor(
    @Inject(ContactTypeRepositoryOutboundPortSymbol)
    private readonly contactTypeRepository: ContactTypeRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<ContactTypeType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.contactTypeRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  contactType  = result.data.map(( contactType ) =>  contactType  as ContactTypeType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  contactType ,
    }
  }
}
