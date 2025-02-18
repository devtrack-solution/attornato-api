import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectMachineService } from '@/application/services/machine/list-to-select-machine.service'
import { mock } from 'jest-mock-extended'
import { MachineTestBuilder } from '@tests/unit/application/services/machine/machine-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'

describe('[APPLICATION] - ListToSelectMachineService', () => {
  let service: ListToSelectMachineService
  let machineRepository: jest.Mocked<MachineRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectMachineService, { provide: MachineRepositoryOutboundPortSymbol, useValue: mock<MachineRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectMachineService>(ListToSelectMachineService)
    machineRepository = module.get(MachineRepositoryOutboundPortSymbol)
  })

  it('should list machines successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'Laser Cutter' }
    const machines = [MachineTestBuilder.getSuccess()]

    machineRepository.findForSelectByCriteria.mockResolvedValue(machines)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    // expect(result[0].name).toEqual(machines[0].name)
  })
})
