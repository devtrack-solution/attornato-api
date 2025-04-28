import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeAreaType } from '@/domain/process/practice-area/types/practice-area.type'
import {
  PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol,
} from '@/domain/process/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { ListPracticeAreaInboundPort } from '@/domain/process/practice-area/ports/inbound/list-practice-area.inbound-port'

@Injectable()
export class ListPracticeAreaService implements ListPracticeAreaInboundPort {
  constructor(
    @Inject(PracticeAreaRepositoryOutboundPortSymbol)
    private readonly practiceAreaRepository: PracticeAreaRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<PracticeAreaType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.practiceAreaRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  practiceArea  = result.data.map(( practiceArea ) =>  practiceArea  as PracticeAreaType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  practiceArea ,
    }
  }
}
