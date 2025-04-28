import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailsType } from '@/domain/process/details/types/details.type'
import { PatchDetailsInboundPort } from '@/domain/process/details/ports/inbound/patch-details.inbound-port'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/process/details/ports/outbound/details-repository.outbound-port'
import { Details } from '@/domain/process/details/business-objects/details.bo'

@Injectable()
export class PatchDetailsService implements PatchDetailsInboundPort {
  constructor(
    @Inject(DetailsRepositoryOutboundPortSymbol)
    private readonly detailsRepository: DetailsRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<DetailsType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.detailsRepository.patchObject(data, criteria, Details, relations)
  }
}
