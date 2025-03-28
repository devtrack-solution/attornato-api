import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { LocalProcedureName } from '@/domain/local-procedure-name/business-objects/local-procedure-name.bo'
import {
  PatchLocalProcedureNameInboundPort
} from '@/domain/local-procedure-name/ports/inbound/patch-local-procedure-name.inbound-port'
import {
  LocalProcedureNameRepositoryOutboundPort,
  LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { LocalProcedureNameType } from '@/domain/local-procedure-name/types/local-procedure-name.type'

@Injectable()
export class PatchLocalProcedureNameService implements PatchLocalProcedureNameInboundPort {
  constructor(
    @Inject(LocalProcedureNameRepositoryOutboundPortSymbol)
    private readonly localProcedureNameRepository: LocalProcedureNameRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<LocalProcedureNameType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.localProcedureNameRepository.patchObject(data, criteria, LocalProcedureName, relations)
  }
}
