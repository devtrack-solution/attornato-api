import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { SubjectType } from '@/domain/subject/types/subject.type'
import {
  SubjectRepositoryOutboundPort,
  SubjectRepositoryOutboundPortSymbol,
} from '@/domain/subject/ports/outbound/subject-repository.outbound-port'
import { ListSubjectInboundPort } from '@/domain/subject/ports/inbound/list-subject.inbound-port'

@Injectable()
export class ListSubjectService implements ListSubjectInboundPort {
  constructor(
    @Inject(SubjectRepositoryOutboundPortSymbol)
    private readonly subjectRepository: SubjectRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<SubjectType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.subjectRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  subject  = result.data.map(( subject ) =>  subject  as SubjectType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  subject ,
    }
  }
}
