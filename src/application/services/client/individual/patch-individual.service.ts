import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Individual } from '@/domain/client/individual/business-objects/individual.bo'
import { PatchIndividualInboundPort } from '@/domain/client/individual/ports/inbound/patch-individual.inbound-port'
import { IndividualRepositoryOutboundPortSymbol, IndividualRepositoryOutboundPort } from '@/domain/client/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualType } from '@/domain/client/individual/types/individual.type'

@Injectable()
export class PatchIndividualService implements PatchIndividualInboundPort {
  constructor(
    @Inject(IndividualRepositoryOutboundPortSymbol)
    private readonly individualRepository: IndividualRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<IndividualType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.individualRepository.patchObject(data, criteria, Individual, relations)
  }
}
