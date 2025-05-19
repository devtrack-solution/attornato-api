import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchSubjectInboundPort } from '@/domain/process/component/subject/ports/inbound/patch-subject.inbound-port'
import { SubjectRepositoryOutboundPort, SubjectRepositoryOutboundPortSymbol } from '@/domain/process/component/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'
import { Subject } from '@/domain/process/component/subject/business-objects/subject.bo'

@Injectable()
export class PatchSubjectService implements PatchSubjectInboundPort {
  constructor(
    @Inject(SubjectRepositoryOutboundPortSymbol)
    private readonly subjectRepository: SubjectRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<SubjectType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.subjectRepository.patchObject(data, criteria, Subject, relations)
  }
}
