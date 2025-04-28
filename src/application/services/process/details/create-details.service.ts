import { Inject, Injectable } from '@nestjs/common'
import { DetailsType } from '@/domain/process/details/types/details.type'
import { CreateDetailsInboundPort } from '@/domain/process/details/ports/inbound/create-details-responsible.inbound-port'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/process/details/ports/outbound/details-repository.outbound-port'
import { Details } from '@/domain/process/details/business-objects/details.bo'

@Injectable()
export class CreateDetailsService implements CreateDetailsInboundPort {
  constructor(
    @Inject(DetailsRepositoryOutboundPortSymbol)
    private readonly detailsRepository: DetailsRepositoryOutboundPort,
  ) {}

  async execute(data: DetailsType.Input): Promise<DetailsType.Output> {
    let  county  = new Details(data)
    await this.detailsRepository.saveObject( county .toPersistence())
    return  county .toJson()
  }
}
