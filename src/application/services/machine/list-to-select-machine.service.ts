import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectMachineInboundPort } from '@/domain/machine/ports/inbound/list-to-select-machine.inbound-port'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'
import { MachineType } from '@/domain/machine/types/machine.type'
import { Machine } from '@/domain/machine/business-objects/machine.bo'

@Injectable()
export class ListToSelectMachineService implements ListToSelectMachineInboundPort {
  constructor(
    @Inject(MachineRepositoryOutboundPortSymbol)
    private readonly machineRepository: MachineRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<MachineType.Output[]>> {
    let machines = await this.machineRepository.findForSelectByCriteria(criteria)
    return machines.map((machine) => new Machine(machine as MachineType.Output).toJson())
  }
}
