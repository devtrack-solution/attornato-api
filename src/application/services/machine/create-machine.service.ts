import { Inject, Injectable } from '@nestjs/common'
import { CreateMachineInboundPort } from '@/domain/machine/ports/inbound/create-machine.inbound-port'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'
import { MachineType } from '@/domain/machine/types/machine.type'
import { Machine } from '@/domain/machine/business-objects/machine.bo'

@Injectable()
export class CreateMachineService implements CreateMachineInboundPort {
  constructor(
    @Inject(MachineRepositoryOutboundPortSymbol)
    private readonly machineRepository: MachineRepositoryOutboundPort,
  ) {}

  async execute(data: MachineType.Input): Promise<MachineType.Output> {
    let machine = new Machine(data)
    await this.machineRepository.saveObject(machine.toPersistence())
    return machine.toJson()
  }
}
