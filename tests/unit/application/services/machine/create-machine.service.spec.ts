import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'
import { CreateMachineService } from '@/application/services/machine/create-machine.service'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'
import { MachineTestBuilder } from './machine-test.builder'

describe('[APPLICATION] - CreateMachineService', () => {
  let service: CreateMachineService
  let machineRepository: jest.Mocked<MachineRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateMachineService, { provide: MachineRepositoryOutboundPortSymbol, useValue: mock<MachineRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateMachineService>(CreateMachineService)
    machineRepository = module.get(MachineRepositoryOutboundPortSymbol)
  })

  it('should create a machine successfully', async () => {
    const inputData = MachineTestBuilder.getSuccess()

    machineRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(machineRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(inputData.name)
  })
})
