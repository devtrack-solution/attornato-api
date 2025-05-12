import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { IdentifierRepositoryOutboundPort, IdentifierRepositoryOutboundPortSymbol } from '@/domain/identifier/ports/outbound/identifier-repository.outbound-port'
import { LastIdentifierInboundPort } from '@/domain/identifier/ports/inbound/last-identifier.inbound-port'
import { IdentifierType } from '@/domain/identifier/types/identifier.type'

@Injectable()
export class LastIdentifierService implements LastIdentifierInboundPort {
  constructor(
    @Inject(IdentifierRepositoryOutboundPortSymbol)
    private readonly identifierRepository: IdentifierRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<IdentifierType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['clientCategory']
    const order = { value: 'DESC' }
    let result = await this.identifierRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let identifier = result.data.map((identifier) => identifier as IdentifierType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: identifier,
    }
  }
}
