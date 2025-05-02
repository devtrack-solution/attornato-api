import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteGroupProcessInboundPort } from '@/domain/process/component/group-process/ports/inbound/delete-group-process.inbound-port'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/component/group-process/ports/outbound/group-process-repository.outbound-port'

@Injectable()
export class DeleteGroupProcessService implements DeleteGroupProcessInboundPort {
  constructor(
    @Inject(GroupProcessRepositoryOutboundPortSymbol)
    private readonly groupProcessRepository: GroupProcessRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.groupProcessRepository.deleteObject(criteria.id)
  }
}
