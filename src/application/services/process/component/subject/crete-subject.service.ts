import { Inject, Injectable } from '@nestjs/common'
import { CreateSubjectInboundPort } from '@/domain/process/component/subject/ports/inbound/create-subject-responsible.inbound-port'
import {
  SubjectRepositoryOutboundPort,
  SubjectRepositoryOutboundPortSymbol,
} from '@/domain/process/component/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'
import { Subject } from '@/domain/process/component/subject/business-objects/subject.bo'

@Injectable()
export class CreateSubjectService implements CreateSubjectInboundPort {
  constructor(
    @Inject(SubjectRepositoryOutboundPortSymbol)
    private readonly subjectRepository: SubjectRepositoryOutboundPort,
  ) {}

  async execute(data: SubjectType.Input): Promise<SubjectType.Output> {
    let  subject  = new Subject(data)
    await this.subjectRepository.saveObject( subject .toPersistence())
    return  subject .toJson()
  }
}
