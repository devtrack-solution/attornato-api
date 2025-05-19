import { Individual } from '@/domain/client/component/individual/business-objects/individual.bo'
import { CreateIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/create-individual.inbound-port'
import { IndividualRepositoryOutboundPortSymbol, IndividualRepositoryOutboundPort } from '@/domain/client/component/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualType } from '@/domain/client/component/individual/types/individual.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateIndividualService implements CreateIndividualInboundPort {
  constructor(
    @Inject(IndividualRepositoryOutboundPortSymbol)
    private readonly individualRepository: IndividualRepositoryOutboundPort,
  ) {}

  async execute(data: IndividualType.Input): Promise<IndividualType.Output> {
    let individual = new Individual(data)
    await this.individualRepository.saveObjectWithRelations(individual.toPersistence())
    return individual.toJson()
  }
}
