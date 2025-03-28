import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocalProcedureNameType } from '@/domain/local-procedure-name/types/local-procedure-name.type'
import {
  ListToSelectLocalProcedureNameInboundPort
} from '@/domain/local-procedure-name/ports/inbound/list-to-select-local-procedure-name.inbound-port'
import {
  LocalProcedureNameRepositoryOutboundPort,
  LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { LocalProcedureName } from '@/domain/local-procedure-name/business-objects/local-procedure-name.bo'

@Injectable()
export class ListToSelectLocalProcedureNameService implements ListToSelectLocalProcedureNameInboundPort {
  constructor(
    @Inject(LocalProcedureNameRepositoryOutboundPortSymbol)
    private readonly localProcedureRepository: LocalProcedureNameRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<LocalProcedureNameType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  localProcedureName  = await this.localProcedureRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  localProcedureName .map(( localProcedureName ) => new LocalProcedureName( localProcedureName  as LocalProcedureNameType.Output).toJson())
  }
}
