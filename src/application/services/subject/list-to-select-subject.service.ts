import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { SubjectType } from '@/domain/subject/types/subject.type'
import { ListToSelectSubjectInboundPort } from '@/domain/subject/ports/inbound/list-to-select-subject.inbound-port'
import {
  SubjectRepositoryOutboundPort,
  SubjectRepositoryOutboundPortSymbol,
} from '@/domain/subject/ports/outbound/subject-repository.outbound-port'
import { Subject } from '@/domain/subject/busness-objects/subject.bo'

@Injectable()
export class ListToSelectSubjectService implements ListToSelectSubjectInboundPort {
  constructor(
    @Inject(SubjectRepositoryOutboundPortSymbol)
    private readonly subjectRepository: SubjectRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<SubjectType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  subject  = await this.subjectRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  subject .map(( subject ) => new Subject( subject  as SubjectType.Output).toJson())
  }
}
