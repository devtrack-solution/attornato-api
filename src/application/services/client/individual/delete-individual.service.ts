import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/delete-individual.inbound-port'
import { IndividualRepositoryOutboundPortSymbol, IndividualRepositoryOutboundPort } from '@/domain/client/component/individual/ports/outbound/individual-repository.outbound-port'

@Injectable()
export class DeleteIndividualService implements DeleteIndividualInboundPort {
  constructor(
    @Inject(IndividualRepositoryOutboundPortSymbol)
    private readonly individualRepository: IndividualRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.individualRepository.deleteObject(criteria.id)
  }
}
