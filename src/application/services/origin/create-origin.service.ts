import { Inject, Injectable } from '@nestjs/common'
import {
  OriginRepositoryOutboundPort,
  OriginRepositoryOutboundPortSymbol,
} from '@/domain/origin/ports/outbound/origin-repository.outbound-port'
import { CreateOriginInboundPort } from '@/domain/origin/ports/inbound/create-origin.inbound-port'
import { OriginType } from '@/domain/origin/types/origin.type'
import { Origin } from '@/domain/origin/business-objects/origin.bo'

@Injectable()
export class CreateOriginService implements CreateOriginInboundPort {
  constructor(
    @Inject(OriginRepositoryOutboundPortSymbol)
    private readonly originRepository: OriginRepositoryOutboundPort,
  ) {}

  async execute(data: OriginType.Input): Promise<OriginType.Output> {
    let  locator  = new Origin(data)
    await this.originRepository.saveObject( locator .toPersistence())
    return  locator .toJson()
  }
}
