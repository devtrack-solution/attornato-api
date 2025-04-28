import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchGroupProcessInboundPort } from '@/domain/process/group-process/ports/inbound/patch-group-process.inbound-port'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/group-process/ports/outbound/group-process-repository.outbound-port'
import { GroupProcessType } from '@/domain/process/group-process/types/group-process.type'
import { GroupProcess } from '@/domain/process/group-process/business-objects/group-process.bo'

@Injectable()
export class PatchGroupProcessService implements PatchGroupProcessInboundPort {
  constructor(
    @Inject(GroupProcessRepositoryOutboundPortSymbol)
    private readonly groupProcessRepository: GroupProcessRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<GroupProcessType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.groupProcessRepository.patchObject(data, criteria, GroupProcess, relations)
  }
}
