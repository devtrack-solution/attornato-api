import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteLocatorInboundPort } from '@/domain/process/locator/ports/inbound/delete-locator.inbound-port'
import { LocatorRepositoryOutboundPortSymbol, LocatorRepositoryOutboundPort } from '@/domain/process/locator/ports/outbound/locator-repository.outbound-port'

@Injectable()
export class DeleteLocatorService implements DeleteLocatorInboundPort {
  constructor(
    @Inject(LocatorRepositoryOutboundPortSymbol)
    private readonly locatorRepository: LocatorRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.locatorRepository.deleteObject(criteria.id)
  }
}
