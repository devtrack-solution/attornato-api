import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'
import { PatchMachineService } from '@/application/services/machine/patch-machine.service'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { MachineTestBuilder } from './machine-test.builder'
import { Machine } from '@/domain/machine/business-objects/machine.bo'

describe('[APPLICATION] - PatchMachineService', () => {
  let service: PatchMachineService
  let machineRepository: jest.Mocked<MachineRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchMachineService, { provide: MachineRepositoryOutboundPortSymbol, useValue: mock<MachineRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchMachineService>(PatchMachineService)
    machineRepository = module.get(MachineRepositoryOutboundPortSymbol)
  })

  it('should patch a machine successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const relations = MachineTestBuilder.getRelationsCriteria()
    const updatedData = MachineTestBuilder.create().withName('UPDATED_MACHINE_NAME').build()

    machineRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(machineRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Machine, relations)
  })
})
