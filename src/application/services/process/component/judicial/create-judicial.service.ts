import { Judicial } from '@/domain/process/component/judicial/business-objects/judicial.bo'
import { CreateJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/create-judicial.inbound-port'
import { JudicialRepositoryOutboundPortSymbol, JudicialRepositoryOutboundPort } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'
import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CreateJudicialService implements CreateJudicialInboundPort {
  private readonly logger = new Logger(CreateJudicialService.name)
  constructor(
    @Inject(JudicialRepositoryOutboundPortSymbol)
    private readonly judicialRepository: JudicialRepositoryOutboundPort,
  ) {}

  async execute(data: JudicialType.Input): Promise<JudicialType.Output> {
    let judicial = new Judicial(data)
    await this.judicialRepository.saveObjectWithRelations(judicial.toPersistence())
    return judicial.toJson()
  }
}
