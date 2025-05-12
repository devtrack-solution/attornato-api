import { Inject, Injectable } from '@nestjs/common'
import { LocalProcedureNameType } from '@/domain/process/component/local-procedure-name/types/local-procedure-name.type'
import {
  LocalProcedureNameRepositoryOutboundPort, LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/process/component/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import {
  CreateLocalProcedureNameInboundPort
} from '@/domain/process/component/local-procedure-name/ports/inbound/create-local-procedure-name.inbound-port'
import { LocalProcedureName } from '@/domain/process/component/local-procedure-name/business-objects/local-procedure-name.bo'

@Injectable()
export class CreateLocalProcedureNameService implements CreateLocalProcedureNameInboundPort {
  constructor(
    @Inject(LocalProcedureNameRepositoryOutboundPortSymbol)
    private readonly localProcedureNameRepository: LocalProcedureNameRepositoryOutboundPort,
  ) {}

  async execute(data: LocalProcedureNameType.Input): Promise<LocalProcedureNameType.Output> {
    let  localProcedureName  = new LocalProcedureName(data)
    await this.localProcedureNameRepository.saveObject( localProcedureName.toPersistence())
    return  localProcedureName.toJson()
  }
}
