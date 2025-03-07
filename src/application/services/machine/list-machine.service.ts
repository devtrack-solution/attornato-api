import { Inject, Injectable } from '@nestjs/common'
import { ListMachineInboundPort } from '@/domain/machine/ports/inbound/list-machine.inbound-port'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'
import { Machine } from '@/domain/machine/business-objects/machine.bo'
import { MachineType } from '@/domain/machine/types/machine.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListMachineService implements ListMachineInboundPort {
  constructor(
    @Inject(MachineRepositoryOutboundPortSymbol)
    private readonly machineRepository: MachineRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<MachineType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const relations: string[] = ['technicalSpecification', 'technicalSpecification.manuals']
    const searchFields: string[] = ['name', 'description']
    const order = { createdAt: 'ASC' }
    let result = await this.machineRepository.findAllByCriteria(criteria, order, searchFields, relations)
    let machines = result.data.map((machine) => new Machine(machine as MachineType.Output).toJson())
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: machines,
    }
  }
}
