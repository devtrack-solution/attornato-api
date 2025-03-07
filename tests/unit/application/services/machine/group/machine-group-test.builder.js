"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineGroupTestBuilder = void 0;
class MachineGroupTestBuilder {
    machineGroup = {
        groupName: 'Cutting Machines Group',
        slug: 'cutting-machines',
        groupCode: 'CMG-001',
        machines: [],
        averageHourlyRate: 150,
        maxDailyProductivity: 1000,
        workSchedules: null,
    };
    static create() {
        return new MachineGroupTestBuilder();
    }
    withName(groupName) {
        this.machineGroup.groupName = groupName;
        return this;
    }
    withSlug(slug) {
        this.machineGroup.slug = slug;
        return this;
    }
    withCode(groupCode) {
        this.machineGroup.groupCode = groupCode;
        return this;
    }
    build() {
        return this.machineGroup;
    }
    static getSuccess() {
        return MachineGroupTestBuilder.create().build();
    }
    static getMultiple(count = 3) {
        return Array.from({ length: count }, (_, i) => MachineGroupTestBuilder.create()
            .withName(`Machine Group ${i + 1}`)
            .withSlug(`group-${i + 1}`)
            .withCode(`GROUP-${i + 1}`)
            .build());
    }
    static getPaginatedCriteria() {
        return { limit: 10, offset: 0, search: '' };
    }
    static getRelationsCriteria() {
        return [];
    }
    static getSelect() {
        return undefined;
    }
    static getSearchFields() {
        return undefined;
    }
    static getOrder() {
        return undefined;
    }
    static getRepositoryResponse() {
        const mockGroups = MachineGroupTestBuilder.getMultiple(3);
        return {
            count: 3,
            limit: 10,
            offset: 0,
            data: mockGroups,
        };
    }
    static getExpectedOutput() {
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
    static getEmptyResponse() {
        return { count: 0, limit: 10, offset: 0, data: [] };
    }
}
exports.MachineGroupTestBuilder = MachineGroupTestBuilder;
//# sourceMappingURL=machine-group-test.builder.js.map