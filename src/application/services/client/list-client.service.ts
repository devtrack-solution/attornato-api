import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListIndividualInboundPort } from '@/domain/client/individual/ports/inbound/list-individual.inbound-port'
import { IndividualRepositoryOutboundPortSymbol, IndividualRepositoryOutboundPort } from '@/domain/client/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualType } from '@/domain/client/individual/types/individual.type'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/client/legal/ports/outbound/legal-repository.outbound-port'
import { LegalType } from '@/domain/client/legal/types/legal.type'

@Injectable()
export class ListClientService implements ListIndividualInboundPort {
  constructor(
    @Inject(IndividualRepositoryOutboundPortSymbol)
    private readonly individualRepository: IndividualRepositoryOutboundPort,
    @Inject(LegalRepositoryOutboundPortSymbol)
    private readonly legalRepository: LegalRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<any> {
    const select: string[] = []
    const relations: string[] = []
    const individualSearchFields: string[] = ['name']
    const legalSearchFields: string[] = ['companyName']
    const order = { createdAt: 'ASC' }

    // Divide o limit por 2 para cada tipo
    const individualCriteria = { ...criteria, limit: Math.ceil(criteria.limit / 2) }
    const legalCriteria = { ...criteria, limit: Math.floor(criteria.limit / 2) }

    const individualResult = await this.individualRepository.findAllByCriteria(individualCriteria, order, select, individualSearchFields, relations)
    const individual = individualResult.data.map((i) => i as IndividualType.Output)

    const legalResult = await this.legalRepository.findAllByCriteria(legalCriteria, order, select, legalSearchFields, relations)
    const legal = legalResult.data.map((l) => l as LegalType.Output)

    // Mescla
    const combined = [...individual, ...legal]

    // Garante o limit final (caso venha menos de um lado)
    const finalData = combined.slice(0, criteria.limit)

    return {
      count: individualResult.count + legalResult.count,
      limit: criteria.limit,
      offset: criteria.offset,
      data: finalData,
    }
  }
}
