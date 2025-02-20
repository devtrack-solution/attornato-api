import { Inject, Injectable } from '@nestjs/common'
import { CreateMachineGroupInboundPort } from '@/domain/machine/group/ports/inbound/create-machine-group.inbound-port'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type'
import { MachineGroup } from '@/domain/machine/group/business-objects/machine-group.bo'
import {
  MachineGroupRepositoryOutboundPort,
  MachineGroupRepositoryOutboundPortSymbol,
} from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port'

@Injectable()
export class CreateMachineGroupService implements CreateMachineGroupInboundPort {
  constructor(
    @Inject(MachineGroupRepositoryOutboundPortSymbol)
    private readonly machineGroupRepository: MachineGroupRepositoryOutboundPort,
  ) {}

  async execute(data: MachineGroupType.Input): Promise<MachineGroupType.Output> {
    let machineGroup = new MachineGroup(data)
    await this.machineGroupRepository.saveObject(machineGroup.toPersistence())
    return machineGroup.toJson()
  }
}
