import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteMachineGroupInboundPort } from '@/domain/machine/group/ports/inbound/delete-machine-group.inbound-port'
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port'

@Injectable()
export class DeleteMachineGroupService implements DeleteMachineGroupInboundPort {
  constructor(
    @Inject(MachineGroupRepositoryOutboundPortSymbol)
    private readonly machineGroupRepository: MachineGroupRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.machineGroupRepository.deleteObject(criteria.id)
  }
}
