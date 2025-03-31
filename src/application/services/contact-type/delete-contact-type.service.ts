import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteContactTypeInboundPort } from '@/domain/contact-type/ports/inbound/delete-contact-type.inbound-port'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'

@Injectable()
export class DeleteContactTypeService implements DeleteContactTypeInboundPort {
  constructor(
    @Inject(ContactTypeRepositoryOutboundPortSymbol)
    private readonly contactTypeRepository: ContactTypeRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.contactTypeRepository.deleteObject(criteria.id)
  }
}
