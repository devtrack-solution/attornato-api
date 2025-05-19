import { Locator } from '@/domain/process/component/locator/business-objects/locator.bo'
import { CreateLocatorInboundPort } from '@/domain/process/component/locator/ports/inbound/create-locator.inbound-port'
import { LocatorRepositoryOutboundPortSymbol, LocatorRepositoryOutboundPort } from '@/domain/process/component/locator/ports/outbound/locator-repository.outbound-port'
import { LocatorType } from '@/domain/process/component/locator/types/locator.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateLocatorService implements CreateLocatorInboundPort {
  constructor(
    @Inject(LocatorRepositoryOutboundPortSymbol)
    private readonly LocatorRepository: LocatorRepositoryOutboundPort,
  ) {}

  async execute(data: LocatorType.Input): Promise<LocatorType.Output> {
    let locator = new Locator(data)
    await this.LocatorRepository.saveObject(locator.toPersistence())
    return locator.toJson()
  }
}
