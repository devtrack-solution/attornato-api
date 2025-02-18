import { Test, TestingModule } from '@nestjs/testing'
import { DeleteMachineService } from '@/application/services/machine/delete-machine.service'
import { mock } from 'jest-mock-extended'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'

describe('[APPLICATION] - DeleteMachineService', () => {
  let service: DeleteMachineService
  let machineRepository: jest.Mocked<MachineRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteMachineService, { provide: MachineRepositoryOutboundPortSymbol, useValue: mock<MachineRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteMachineService>(DeleteMachineService)
    machineRepository = module.get(MachineRepositoryOutboundPortSymbol)
  })

  it('should delete a machine by ID', async () => {
    const criteria = { id: 'valid-id' }

    machineRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(machineRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })
})
