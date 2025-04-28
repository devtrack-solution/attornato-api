import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectLocatorInboundPort } from '@/domain/process/locator/ports/inbound/list-to-select-locator.inbound-port'
import { LocatorRepositoryOutboundPortSymbol, LocatorRepositoryOutboundPort } from '@/domain/process/locator/ports/outbound/locator-repository.outbound-port'
import { LocatorType } from '@/domain/process/locator/types/locator.type'
import { Locator } from '@/domain/process/locator/business-objects/locator.bo'

@Injectable()
export class ListToSelectLocatorService implements ListToSelectLocatorInboundPort {
  constructor(
    @Inject(LocatorRepositoryOutboundPortSymbol)
    private readonly locatorRepository: LocatorRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<LocatorType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  locator  = await this.locatorRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  locator .map(( locator ) => new Locator( locator  as LocatorType.Output).toJson())
  }
}
