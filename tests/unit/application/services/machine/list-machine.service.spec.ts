import { Test, TestingModule } from '@nestjs/testing'
import { ListMachineService } from '@/application/services/machine/list-machine.service'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'
import { MachineTestBuilder } from '@tests/unit/application/services/machine/machine-test.builder'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - ListMachineService', () => {
  let service: ListMachineService
  let machineRepository: jest.Mocked<MachineRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListMachineService,
        { provide: MachineRepositoryOutboundPortSymbol, useValue: mock<MachineRepositoryOutboundPort>() },
      ],
    }).compile()

    service = module.get<ListMachineService>(ListMachineService)
    machineRepository = module.get(MachineRepositoryOutboundPortSymbol)
  })

  it('should return paginated machines', async () => {
    const criteria = MachineTestBuilder.getPaginatedCriteria()
    const mockResponse = MachineTestBuilder.getRepositoryResponse()

    machineRepository.findAllByCriteria.mockResolvedValue(mockResponse)

    const result = await service.execute(criteria)

    expect(result).toEqual(MachineTestBuilder.getExpectedOutput())
    expect(machineRepository.findAllByCriteria).toHaveBeenCalledWith(criteria)
    expect(machineRepository.findAllByCriteria).toHaveBeenCalledTimes(1)
  })

  it('should return an empty list if no machines are found', async () => {
    const criteria = MachineTestBuilder.getPaginatedCriteria()
    const emptyResponse = MachineTestBuilder.getEmptyResponse()

    machineRepository.findAllByCriteria.mockResolvedValue(emptyResponse)

    const result = await service.execute(criteria)

    expect(result).toEqual(emptyResponse)
    expect(machineRepository.findAllByCriteria).toHaveBeenCalledWith(criteria)
  })

  it('should throw an error if repository fails', async () => {
    const criteria = MachineTestBuilder.getPaginatedCriteria()

    machineRepository.findAllByCriteria.mockRejectedValue(new Error('Database error'))

    await expect(service.execute(criteria)).rejects.toThrow('Database error')
    expect(machineRepository.findAllByCriteria).toHaveBeenCalledWith(criteria)
  })
})
