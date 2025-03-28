import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeFieldType } from '@/domain/free-field/types/free-field.type'
import { ListFreeFieldInboundPort } from '@/domain/free-field/ports/inbound/list-free-field.inbound-port'
import {
  FreeFieldRepositoryOutboundPort,
  FreeFieldRepositoryOutboundPortSymbol,
} from '@/domain/free-field/ports/outbound/free-field-repository.outbound-port'

@Injectable()
export class ListFreeFieldService implements ListFreeFieldInboundPort {
  constructor(
    @Inject(FreeFieldRepositoryOutboundPortSymbol)
    private readonly freeFieldRepository: FreeFieldRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<FreeFieldType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.freeFieldRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  freeField  = result.data.map(( freeField ) =>  freeField  as FreeFieldType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  freeField ,
    }
  }
}
