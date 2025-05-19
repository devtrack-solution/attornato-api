import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/component/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { DeletePracticeAreaInboundPort } from '@/domain/process/component/practice-area/ports/inbound/delete-practice-area.inbound-port'

@Injectable()
export class DeletePracticeAreaService implements DeletePracticeAreaInboundPort {
  constructor(
    @Inject(PracticeAreaRepositoryOutboundPortSymbol)
    private readonly practiceAreaRepository: PracticeAreaRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.practiceAreaRepository.deleteObject(criteria.id)
  }
}
