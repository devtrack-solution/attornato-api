import { Inject, Injectable } from '@nestjs/common'
import { ListMachineGroupInboundPort } from '@/domain/machine/group/ports/inbound/list-machine-group.inbound-port'
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port'
import { MachineGroup } from '@/domain/machine/group/business-objects/machine-group.bo'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListMachineGroupService implements ListMachineGroupInboundPort {
  constructor(
    @Inject(MachineGroupRepositoryOutboundPortSymbol)
    private readonly machineGroupRepository: MachineGroupRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<MachineGroupType.OutputPaginated> {
    let result = await this.machineGroupRepository.findAllByCriteria(criteria, [])
    let machines = result.data.map((machine) => new MachineGroup(machine as MachineGroupType.Output).toJson())
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: machines,
    }
  }
}
