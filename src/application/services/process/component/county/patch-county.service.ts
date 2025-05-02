import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { CountyType } from '@/domain/process/component/county/types/county.type'
import { County } from '@/domain/process/component/county/business-objects/county.bo'
import { PatchCountyInboundPort } from '@/domain/process/component/county/ports/inbound/patch-county.inbound-port'
import { CountyRepositoryOutboundPortSymbol, CountyRepositoryOutboundPort } from '@/domain/process/component/county/ports/outbound/county-repository.outbound-port'

@Injectable()
export class PatchCountyService implements PatchCountyInboundPort {
  constructor(
    @Inject(CountyRepositoryOutboundPortSymbol)
    private readonly countyRepository: CountyRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<CountyType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.countyRepository.patchObject(data, criteria, County, relations)
  }
}
