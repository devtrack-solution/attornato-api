import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchMachineGroupInboundPort } from '@/domain/machine/group/ports/inbound/patch-machine-group.inbound-port'
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type'

@Injectable()
export class PatchMachineGroupService implements PatchMachineGroupInboundPort {
  constructor(
    @Inject(MachineGroupRepositoryOutboundPortSymbol)
    private readonly machineGroupRepository: MachineGroupRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<MachineGroupType.Input>, criteria: Criteria.ById): Promise<void> {
    await this.machineGroupRepository.patchObject(data, criteria)
  }
}
