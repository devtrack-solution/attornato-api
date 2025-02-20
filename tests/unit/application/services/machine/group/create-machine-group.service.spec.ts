import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { CreateMachineGroupService } from '@/application/services/machine/group/create-machine-group.service';
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port';
import { MachineGroupTestBuilder } from './machine-group-test.builder';

describe('[APPLICATION] - CreateMachineGroupService', () => {
  let service: CreateMachineGroupService;
  let machineGroupRepository: jest.Mocked<MachineGroupRepositoryOutboundPort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMachineGroupService,
        { provide: MachineGroupRepositoryOutboundPortSymbol, useValue: mock<MachineGroupRepositoryOutboundPort>() },
      ],
    }).compile();

    service = module.get<CreateMachineGroupService>(CreateMachineGroupService);
    machineGroupRepository = module.get(MachineGroupRepositoryOutboundPortSymbol);
  });

  it('should create a machine group successfully', async () => {
    const inputData = MachineGroupTestBuilder.getSuccess();

    machineGroupRepository.saveObject.mockResolvedValue(undefined);

    const result = await service.execute(inputData);

    expect(machineGroupRepository.saveObject).toHaveBeenCalledWith(expect.any(Object));
    expect(result.groupName).toEqual(inputData.groupName);
  });
});
