"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineTestBuilder = void 0;
class MachineTestBuilder {
    machine = {
        name: 'Laser Cutter',
        description: 'High precision laser cutting machine',
        machineCode: 'IM12345S001',
        status: 'AVAILABLE',
    };
    static create() {
        return new MachineTestBuilder();
    }
    withName(name) {
        this.machine.name = name;
        return this;
    }
    withMachineCode(code) {
        this.machine.machineCode = code;
        return this;
    }
    withStatus(status) {
        this.machine.status = status;
        return this;
    }
    build() {
        return this.machine;
    }
    static getSuccess() {
        return MachineTestBuilder.create().build();
    }
    static getMultiple(count = 3) {
        return Array.from({ length: count }, (_, i) => MachineTestBuilder.create()
            .withName(`Machine ${i + 1}`)
            .withMachineCode(`CODE-${i + 1}`)
            .build());
    }
    static getPaginatedCriteria() {
        return { limit: 10, offset: 0, search: '' };
    }
    static getRelationsCriteria() {
        return ['technicalSpecification', 'technicalSpecification.manuals'];
    }
    static getSelect() {
        return ['id', 'name', 'status', 'createdAt'];
    }
    static getSearchFields() {
        return ['name', 'description'];
    }
    static getOrder() {
        return { "createdAt": "ASC" };
    }
    static getRepositoryResponse() {
        const mockMachines = MachineTestBuilder.getMultiple(3);
        return {
            count: 3,
            limit: 10,
            offset: 0,
            data: mockMachines,
        };
    }
    static getExpectedOutput() {
        return {
            count: 3,
            limit: 10,
            offset: 0,
            data: expect.arrayContaining([
                expect.objectContaining({ name: 'Machine 1', machineCode: 'CODE-1' }),
                expect.objectContaining({ name: 'Machine 2', machineCode: 'CODE-2' }),
                expect.objectContaining({ name: 'Machine 3', machineCode: 'CODE-3' }),
            ]),
        };
    }
    static getEmptyResponse() {
        return { count: 0, limit: 10, offset: 0, data: [] };
    }
}
exports.MachineTestBuilder = MachineTestBuilder;
//# sourceMappingURL=machine-test.builder.js.map