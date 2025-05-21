import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { Judicial } from '@/domain/process/component/judicial/business-objects/judicial.bo'
import { PatchJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/patch-judicial.inbound-port'
import { JudicialRepositoryOutboundPortSymbol, JudicialRepositoryOutboundPort } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class PatchJudicialService implements PatchJudicialInboundPort {
  constructor(
    @Inject(JudicialRepositoryOutboundPortSymbol)
    private readonly judicialRepository: JudicialRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<JudicialType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    if (data?.processFinancial) {
      let uuid = uuidv4()
      data.processFinancialId = uuid
      data.processFinancial.id = uuid
    }
    if (data?.processDetail){
      let uuid = uuidv4()
      data.processDetailId = uuid
      data.processDetail.id = uuid
    }

    await this.judicialRepository.patchObject(data, criteria, Judicial, relations)
  }
}
