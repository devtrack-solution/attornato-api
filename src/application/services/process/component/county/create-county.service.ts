import { County } from '@/domain/process/component/county/business-objects/county.bo'
import { CreateCountyInboundPort } from '@/domain/process/component/county/ports/inbound/create-county.inbound-port'
import { CountyRepositoryOutboundPortSymbol, CountyRepositoryOutboundPort } from '@/domain/process/component/county/ports/outbound/county-repository.outbound-port'
import { CountyType } from '@/domain/process/component/county/types/county.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateCountyService implements CreateCountyInboundPort {
  constructor(
    @Inject(CountyRepositoryOutboundPortSymbol)
    private readonly CountyRepository: CountyRepositoryOutboundPort,
  ) {}

  async execute(data: CountyType.Input): Promise<CountyType.Output> {
    let county = new County(data)
    await this.CountyRepository.saveObject(county.toPersistence())
    return county.toJson()
  }
}
