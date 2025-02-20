import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type';
import { Criteria } from '@/core/domain/types/criteria.type';

export class MachineGroupTestBuilder {
  private machineGroup: Partial<MachineGroupType.Input> = {
    groupName: 'Cutting Machines Group',
    slug: 'cutting-machines',
    groupCode: 'CMG-001',
    machines: [],
    averageHourlyRate: 150,
    maxDailyProductivity: 1000,
    workSchedules: null,
  };

  static create(): MachineGroupTestBuilder {
    return new MachineGroupTestBuilder();
  }

  withName(groupName: string): this {
    this.machineGroup.groupName = groupName;
    return this;
  }

  withSlug(slug: string): this {
    this.machineGroup.slug = slug;
    return this;
  }

  withCode(groupCode: string): this {
    this.machineGroup.groupCode = groupCode;
    return this;
  }

  build(): MachineGroupType.Input {
    return this.machineGroup as MachineGroupType.Input;
  }

  static getSuccess(): MachineGroupType.Input {
    return MachineGroupTestBuilder.create().build();
  }

  static getMultiple(count: number = 3): MachineGroupType.Input[] {
    return Array.from({ length: count }, (_, i) =>
      MachineGroupTestBuilder.create()
        .withName(`Machine Group ${i + 1}`)
        .withSlug(`group-${i + 1}`)
        .withCode(`GROUP-${i + 1}`)
        .build()
    );
  }

  static getPaginatedCriteria(): Criteria.Paginated {
    return { limit: 10, offset: 0, search: '' };
  }

  static getRelationsCriteria(): string[] {
    return []
  }

  static getRepositoryResponse(): { count: number; limit: number; offset: number; data: MachineGroupType.Input[] } {
    const mockGroups = MachineGroupTestBuilder.getMultiple(3);
    return {
      count: 3,
      limit: 10,
      offset: 0,
      data: mockGroups,
    };
  }

  static getExpectedOutput(): { count: number; limit: number; offset: number; data: object[] } {
    return {
      count: 3,
      limit: 10,
      offset: 0,
      data: expect.arrayContaining([
        expect.objectContaining({ groupName: 'Machine Group 1', slug: 'group-1' }),
        expect.objectContaining({ groupName: 'Machine Group 2', slug: 'group-2' }),
        expect.objectContaining({ groupName: 'Machine Group 3', slug: 'group-3' }),
      ]),
    };
  }

  static getEmptyResponse(): { count: number; limit: number; offset: number; data: [] } {
    return { count: 0, limit: 10, offset: 0, data: [] };
  }
}
