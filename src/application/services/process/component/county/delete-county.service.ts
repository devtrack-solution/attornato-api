import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteCountyInboundPort } from '@/domain/process/component/county/ports/inbound/delete-county.inbound-port'
import { CountyRepositoryOutboundPortSymbol, CountyRepositoryOutboundPort } from '@/domain/process/component/county/ports/outbound/county-repository.outbound-port'

@Injectable()
export class DeleteCountyService implements DeleteCountyInboundPort {
  constructor(
    @Inject(CountyRepositoryOutboundPortSymbol)
    private readonly countyRepository: CountyRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.countyRepository.deleteObject(criteria.id)
  }
}
