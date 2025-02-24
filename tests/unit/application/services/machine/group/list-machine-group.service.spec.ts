import { Test, TestingModule } from '@nestjs/testing'
import { ListMachineGroupService } from '@/application/services/machine/group/list-machine-group.service'
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port'
import { MachineGroupTestBuilder } from '@tests/unit/application/services/machine/group/machine-group-test.builder'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - ListMachineGroupService', () => {
  let service: ListMachineGroupService
  let machineGroupRepository: jest.Mocked<MachineGroupRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListMachineGroupService, { provide: MachineGroupRepositoryOutboundPortSymbol, useValue: mock<MachineGroupRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListMachineGroupService>(ListMachineGroupService)
    machineGroupRepository = module.get(MachineGroupRepositoryOutboundPortSymbol)
  })

  it('should return paginated machine groups', async () => {
    const criteria = MachineGroupTestBuilder.getPaginatedCriteria()
    const mockResponse = MachineGroupTestBuilder.getRepositoryResponse()

    machineGroupRepository.findAllByCriteria.mockResolvedValue(mockResponse)

    const result = await service.execute(criteria)

    expect(result).toEqual(MachineGroupTestBuilder.getExpectedOutput())
    expect(machineGroupRepository.findAllByCriteria).toHaveBeenCalledWith(criteria)
    expect(machineGroupRepository.findAllByCriteria).toHaveBeenCalledTimes(1)
  })

  it('should return an empty list if no machine groups are found', async () => {
    const criteria = MachineGroupTestBuilder.getPaginatedCriteria()
    const emptyResponse = MachineGroupTestBuilder.getEmptyResponse()

    machineGroupRepository.findAllByCriteria.mockResolvedValue(emptyResponse)

    const result = await service.execute(criteria)

    expect(result).toEqual(emptyResponse)
    expect(machineGroupRepository.findAllByCriteria).toHaveBeenCalledWith(criteria)
  })

  it('should throw an error if repository fails', async () => {
    const criteria = MachineGroupTestBuilder.getPaginatedCriteria()
    machineGroupRepository.findAllByCriteria.mockRejectedValue(new Error('Database error'))

    await expect(service.execute(criteria)).rejects.toThrow('Database error')
    expect(machineGroupRepository.findAllByCriteria).toHaveBeenCalledWith(criteria)
  })
})
