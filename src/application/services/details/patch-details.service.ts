import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailsType } from '@/domain/details/types/details.type'
import { PatchDetailsInboundPort } from '@/domain/details/ports/inbound/patch-details.inbound-port'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/details/ports/outbound/details-repository.outbound-port'
import { Details } from '@/domain/details/busness-objects/details.bo'

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
