import { Inject, Injectable } from '@nestjs/common';
import { Criteria } from '@/core/domain/types/criteria.type';
import { ListToSelectMachineGroupInboundPort } from '@/domain/machine/group/ports/inbound/list-to-select-machine-group.inbound-port';
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port';
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type';
import { MachineGroup } from '@/domain/machine/group/business-objects/machine-group.bo';

@Injectable()
export class ListToSelectMachineGroupService implements ListToSelectMachineGroupInboundPort {
  constructor(
    @Inject(MachineGroupRepositoryOutboundPortSymbol)
    private readonly machineGroupRepository: MachineGroupRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<MachineGroupType.Output[]>> {
    let machineGroups = await this.machineGroupRepository.findForSelectByCriteria(criteria);
    return machineGroups.map((group) => new MachineGroup(group as MachineGroupType.Output).toJson());
  }
}
