import { Judicial } from '@/domain/process/component/judicial/business-objects/judicial.bo'
import { CreateJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/create-judicial-responsible.inbound-port'
import { JudicialRepositoryOutboundPortSymbol, JudicialRepositoryOutboundPort } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateJudicialService implements CreateJudicialInboundPort {
  constructor(
    @Inject(JudicialRepositoryOutboundPortSymbol)
    private readonly judicialRepository: JudicialRepositoryOutboundPort,
  ) {}

  async execute(data: JudicialType.Input): Promise<JudicialType.Output> {
    let  judicial  = new Judicial(data)
    await this.judicialRepository.saveObject( judicial .toPersistence())
    return  judicial .toJson()
  }
}
