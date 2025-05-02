import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Legal } from '@/domain/client/component/legal/business-objects/legal.bo'
import { PatchLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/patch-legal.inbound-port'
import { LegalRepositoryOutboundPortSymbol, LegalRepositoryOutboundPort } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { LegalType } from '@/domain/client/component/legal/types/legal.type'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class PatchLegalService implements PatchLegalInboundPort {
  constructor(
    @Inject(LegalRepositoryOutboundPortSymbol)
    private readonly legalRepository: LegalRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<LegalType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = ['groupCustomer', 'profile', 'person.communicationAddress.contacts', 'person.contactPerson.freeField']
    const communication = data.person?.communicationAddress
    if (Array.isArray(communication?.contacts)) {
      communication.contacts = communication.contacts.map((contact) => ({
        id: contact.id ?? uuidv4(),
        ...contact,
      }))
    }
    await this.legalRepository.patchObject(data, criteria, Legal, relations)
  }
}
