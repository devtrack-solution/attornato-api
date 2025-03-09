import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchMachineInboundPort } from '@/domain/machine/ports/inbound/patch-machine.inbound-port'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'
import { MachineType } from '@/domain/machine/types/machine.type'
import { Machine } from '@/domain/machine/business-objects/machine.bo'

@Injectable()
export class PatchMachineService implements PatchMachineInboundPort {
  constructor(
    @Inject(MachineRepositoryOutboundPortSymbol)
    private readonly machineRepository: MachineRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<MachineType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = ['technicalSpecification', 'technicalSpecification.manuals']
    await this.machineRepository.patchObject(data, criteria, Machine, relations)
  }
}
