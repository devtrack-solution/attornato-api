import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocalProcedureNameType } from '@/domain/process/component/local-procedure-name/types/local-procedure-name.type'
import {
  ListLocalProcedureNameInboundPort
} from '@/domain/process/component/local-procedure-name/ports/inbound/list-local-procedure-name.inbound-port'
import {
  LocalProcedureNameRepositoryOutboundPort,
  LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/process/component/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'

@Injectable()
export class ListLocalProcedureNameService implements ListLocalProcedureNameInboundPort {
  constructor(
    @Inject(LocalProcedureNameRepositoryOutboundPortSymbol)
    private readonly localProcedureNameRepository: LocalProcedureNameRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<LocalProcedureNameType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.localProcedureNameRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  localProcedureName  = result.data.map(( localProcedureName ) =>  localProcedureName  as LocalProcedureNameType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  localProcedureName ,
    }
  }
}
