import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import {
  LocalProcedureNameRepositoryOutboundPort, LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import {
  DeleteLocalProcedureNameInboundPort
} from '@/domain/local-procedure-name/ports/inbound/delete-local-procedure.name.inbound-port'

@Injectable()
export class DeleteLocalProcedureNameService implements DeleteLocalProcedureNameInboundPort {
  constructor(
    @Inject(LocalProcedureNameRepositoryOutboundPortSymbol)
    private readonly localProcedureNameRepository: LocalProcedureNameRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.localProcedureNameRepository.deleteObject(criteria.id)
  }
}
