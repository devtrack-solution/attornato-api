import { Inject, Injectable } from '@nestjs/common'
import { CreateSubjectInboundPort } from '@/domain/subject/ports/inbound/create-subject-responsible.inbound-port'
import {
  SubjectRepositoryOutboundPort,
  SubjectRepositoryOutboundPortSymbol,
} from '@/domain/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectType } from '@/domain/subject/types/subject.type'
import { Subject } from '@/domain/subject/busness-objects/subject.bo'

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
