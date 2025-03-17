import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'
import { PatchMachineGroupService } from '@/application/services/machine/group/patch-machine-group.service'
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { MachineGroupTestBuilder } from './machine-group-test.builder'
import { MachineGroup } from '@/domain/machine/group/business-objects/machine-group.bo'

describe('[APPLICATION] - PatchMachineGroupService', () => {
  let service: PatchMachineGroupService
  let machineGroupRepository: jest.Mocked<MachineGroupRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchMachineGroupService, { provide: MachineGroupRepositoryOutboundPortSymbol, useValue: mock<MachineGroupRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchMachineGroupService>(PatchMachineGroupService)
    machineGroupRepository = module.get(MachineGroupRepositoryOutboundPortSymbol)
  })

  it('should patch a machine group successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-group-id' }
    const updatedData = MachineGroupTestBuilder.create().withName('UPDATED_GROUP_NAME').build()

    machineGroupRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(machineGroupRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, MachineGroup)
    expect(machineGroupRepository.patchObject).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if patching a machine group fails', async () => {
    const criteria: Criteria.ById = { id: 'invalid-group-id' }
    const updatedData = MachineGroupTestBuilder.create().withName('FAILED_UPDATE').build()

    machineGroupRepository.patchObject.mockRejectedValue(new Error('Database error'))

    await expect(service.execute(updatedData, criteria)).rejects.toThrow('Database error')
    expect(machineGroupRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, MachineGroup)
  })
})
