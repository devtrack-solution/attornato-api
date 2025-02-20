import { Test, TestingModule } from '@nestjs/testing';
import { DeleteMachineGroupService } from '@/application/services/machine/group/delete-machine-group.service';
import { mock } from 'jest-mock-extended';
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port';

describe('[APPLICATION] - DeleteMachineGroupService', () => {
  let service: DeleteMachineGroupService;
  let machineGroupRepository: jest.Mocked<MachineGroupRepositoryOutboundPort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteMachineGroupService,
        { provide: MachineGroupRepositoryOutboundPortSymbol, useValue: mock<MachineGroupRepositoryOutboundPort>() },
      ],
    }).compile();

    service = module.get<DeleteMachineGroupService>(DeleteMachineGroupService);
    machineGroupRepository = module.get(MachineGroupRepositoryOutboundPortSymbol);
  });

  it('should delete a machine group by ID', async () => {
    const criteria = { id: 'valid-group-id' };

    machineGroupRepository.deleteObject.mockResolvedValue(undefined);

    await service.execute(criteria);

    expect(machineGroupRepository.deleteObject).toHaveBeenCalledWith(criteria.id);
    expect(machineGroupRepository.deleteObject).toHaveBeenCalledTimes(1);
  });
});
