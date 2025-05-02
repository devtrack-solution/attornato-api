import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Individual } from '@/domain/client/component/individual/business-objects/individual.bo'
import { PatchIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/patch-individual.inbound-port'
import { IndividualRepositoryOutboundPortSymbol, IndividualRepositoryOutboundPort } from '@/domain/client/component/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualType } from '@/domain/client/component/individual/types/individual.type'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class PatchIndividualService implements PatchIndividualInboundPort {
  constructor(
    @Inject(IndividualRepositoryOutboundPortSymbol)
    private readonly individualRepository: IndividualRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<IndividualType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = ['groupCustomer', 'profile', 'person.communicationAddress.contacts', 'person.contactPerson.freeField']
    const communication = data.person?.communicationAddress
    if (Array.isArray(communication?.contacts)) {
      communication.contacts = communication.contacts.map((contact) => ({
        id: contact.id ?? uuidv4(),
        ...contact,
      }))
    }
    await this.individualRepository.patchObject(data, criteria, Individual, relations)
  }
}
