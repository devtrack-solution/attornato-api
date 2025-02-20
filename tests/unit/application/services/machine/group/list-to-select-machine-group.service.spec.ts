import { Test, TestingModule } from '@nestjs/testing';
import { ListToSelectMachineGroupService } from '@/application/services/machine/group/list-to-select-machine-group.service';
import { mock } from 'jest-mock-extended';
import { MachineGroupTestBuilder } from '@tests/unit/application/services/machine/group/machine-group-test.builder';
import { Criteria } from '@/core/domain/types/criteria.type';
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port';

describe('[APPLICATION] - ListToSelectMachineGroupService', () => {
  let service: ListToSelectMachineGroupService;
  let machineGroupRepository: jest.Mocked<MachineGroupRepositoryOutboundPort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListToSelectMachineGroupService,
        { provide: MachineGroupRepositoryOutboundPortSymbol, useValue: mock<MachineGroupRepositoryOutboundPort>() },
      ],
    }).compile();

    service = module.get<ListToSelectMachineGroupService>(ListToSelectMachineGroupService);
    machineGroupRepository = module.get(MachineGroupRepositoryOutboundPortSymbol);
  });

  it('should list machine groups successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'Cutting Machines Group' };
    const machineGroups = [MachineGroupTestBuilder.getSuccess()];

    machineGroupRepository.findForSelectByCriteria.mockResolvedValue(machineGroups);

    const result = await service.execute(criteria);

    expect(result).toHaveLength(1);
    expect(result[0]?.groupName).toEqual(machineGroups[0].groupName);
  });

  it('should return an empty list if no machine groups are found', async () => {
    const criteria: Criteria.FindBy = { search: 'Non-existent Group' };

    machineGroupRepository.findForSelectByCriteria.mockResolvedValue([]);

    const result = await service.execute(criteria);

    expect(result).toHaveLength(0);
  });

  it('should throw an error if repository fails', async () => {
    const criteria: Criteria.FindBy = { search: 'Error Case' };

    machineGroupRepository.findForSelectByCriteria.mockRejectedValue(new Error('Database error'));

    await expect(service.execute(criteria)).rejects.toThrow('Database error');
  });
});
