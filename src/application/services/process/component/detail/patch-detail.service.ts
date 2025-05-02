import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'
import { PatchDetailInboundPort } from '@/domain/process/component/detail/ports/inbound/patch-detail.inbound-port'
import {
  DetailRepositoryOutboundPort,
  DetailRepositoryOutboundPortSymbol,
} from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { Detail } from '@/domain/process/component/detail/business-objects/detail.bo'

@Injectable()
export class PatchDetailService implements PatchDetailInboundPort {
  constructor(
    @Inject(DetailRepositoryOutboundPortSymbol)
    private readonly detailRepository: DetailRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<DetailType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.detailRepository.patchObject(data, criteria, Detail, relations)
  }
}
