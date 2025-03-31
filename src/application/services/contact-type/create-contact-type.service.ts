import { Inject, Injectable } from '@nestjs/common'
import { CreateContactTypeInboundPort } from '@/domain/contact-type/ports/inbound/create-contact-type.inbound-port'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { ContactType } from '@/domain/contact-type/business-objects/contact-type.bo'

@Injectable()
export class CreateContactTypeService implements CreateContactTypeInboundPort {
  constructor(
    @Inject(ContactTypeRepositoryOutboundPortSymbol)
    private readonly contactTypeRepository: ContactTypeRepositoryOutboundPort,
  ) {}

  async execute(data: ContactTypeType.Input): Promise<ContactTypeType.Output> {
    let  contactType  = new ContactType(data)
    await this.contactTypeRepository.saveObject( contactType .toPersistence())
    return  contactType .toJson()
  }
}
