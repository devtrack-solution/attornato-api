import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { SubjectRepositoryOutboundPort, SubjectRepositoryOutboundPortSymbol } from '@/domain/process/component/subject/ports/outbound/subject-repository.outbound-port'
import { DeleteSubjectInboundPort } from '@/domain/process/component/subject/ports/inbound/delete-subject.inbound-port'

@Injectable()
export class DeleteSubjectService implements DeleteSubjectInboundPort {
  constructor(
    @Inject(SubjectRepositoryOutboundPortSymbol)
    private readonly subjectRepository: SubjectRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.subjectRepository.deleteObject(criteria.id)
  }
}
