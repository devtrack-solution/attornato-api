import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteMachineInboundPort } from '@/domain/machine/ports/inbound/delete-machine.inbound-port'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'

@Injectable()
export class DeleteMachineService implements DeleteMachineInboundPort {
  constructor(
    @Inject(MachineRepositoryOutboundPortSymbol)
    private readonly machineRepository: MachineRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.machineRepository.deleteObject(criteria.id)
  }
}
