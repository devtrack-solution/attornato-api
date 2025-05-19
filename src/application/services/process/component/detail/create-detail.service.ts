import { Inject, Injectable } from '@nestjs/common'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'
import { CreateDetailInboundPort } from '@/domain/process/component/detail/ports/inbound/create-detail-responsible.inbound-port'
import { DetailRepositoryOutboundPort, DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { Detail } from '@/domain/process/component/detail/business-objects/detail.bo'

@Injectable()
export class CreateDetailService implements CreateDetailInboundPort {
  constructor(
    @Inject(DetailRepositoryOutboundPortSymbol)
    private readonly detailRepository: DetailRepositoryOutboundPort,
  ) {}

  async execute(data: DetailType.Input): Promise<DetailType.Output> {
    let county = new Detail(data)
    await this.detailRepository.saveObject(county.toPersistence())
    return county.toJson()
  }
}
