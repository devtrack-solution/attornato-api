import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchContactTypeInboundPort } from '@/domain/contact-type/ports/inbound/patch-contact-type.inbound-port'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { ContactType } from '@/domain/contact-type/business-objects/contact-type.bo'

@Injectable()
export class PatchContactTypeService implements PatchContactTypeInboundPort {
  constructor(
    @Inject(ContactTypeRepositoryOutboundPortSymbol)
    private readonly contactTypeRepository: ContactTypeRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<ContactTypeType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.contactTypeRepository.patchObject(data, criteria, ContactType, relations)
  }
}
