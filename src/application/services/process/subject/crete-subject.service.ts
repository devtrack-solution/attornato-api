import { Inject, Injectable } from '@nestjs/common'
import { CreateSubjectInboundPort } from '@/domain/process/subject/ports/inbound/create-subject-responsible.inbound-port'
import {
  SubjectRepositoryOutboundPort,
  SubjectRepositoryOutboundPortSymbol,
} from '@/domain/process/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectType } from '@/domain/process/subject/types/subject.type'
import { Subject } from '@/domain/process/subject/business-objects/subject.bo'

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
