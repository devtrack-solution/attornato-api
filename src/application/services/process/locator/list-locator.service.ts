import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListLocatorInboundPort } from '@/domain/process/locator/ports/inbound/list-locator.inbound-port'
import { LocatorRepositoryOutboundPortSymbol, LocatorRepositoryOutboundPort } from '@/domain/process/locator/ports/outbound/locator-repository.outbound-port'
import { LocatorType } from '@/domain/process/locator/types/locator.type'

@Injectable()
export class ListLocatorService implements ListLocatorInboundPort {
  constructor(
    @Inject(LocatorRepositoryOutboundPortSymbol)
    private readonly locatorRepository: LocatorRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<LocatorType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.locatorRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  locator  = result.data.map(( locator ) =>  locator  as LocatorType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  locator ,
    }
  }
}
