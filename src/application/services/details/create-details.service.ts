import { Inject, Injectable } from '@nestjs/common'
import { DetailsType } from '@/domain/details/types/details.type'
import { CreateDetailsInboundPort } from '@/domain/details/ports/inbound/create-details-responsible.inbound-port'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/details/ports/outbound/details-repository.outbound-port'
import { Details } from '@/domain/details/busness-objects/details.bo'

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
