import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type';
import { Criteria } from '@/core/domain/types/criteria.type';
export declare class MachineGroupTestBuilder {
    private machineGroup;
    static create(): MachineGroupTestBuilder;
    withName(groupName: string): this;
    withSlug(slug: string): this;
    withCode(groupCode: string): this;
    build(): MachineGroupType.Input;
    static getSuccess(): MachineGroupType.Input;
    static getMultiple(count?: number): MachineGroupType.Input[];
    static getPaginatedCriteria(): Criteria.Paginated;
    static getRelationsCriteria(): string[];
    static getSelect(): string[] | undefined;
    static getSearchFields(): string[] | undefined;
    static getOrder(): Record<string, string> | undefined;
    static getRepositoryResponse(): {
        count: number;
        limit: number;
        offset: number;
        data: MachineGroupType.Input[];
    };
    static getExpectedOutput(): {
        count: number;
        limit: number;
        offset: number;
        data: object[];
    };
    static getEmptyResponse(): {
        count: number;
        limit: number;
        offset: number;
        data: [];
    };
}
