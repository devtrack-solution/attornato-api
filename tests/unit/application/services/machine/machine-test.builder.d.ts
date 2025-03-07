import { MachineType } from '@/domain/machine/types/machine.type';
import { Criteria } from '@/core/domain/types/criteria.type';
export declare class MachineTestBuilder {
    private machine;
    static create(): MachineTestBuilder;
    withName(name: string): this;
    withMachineCode(code: string): this;
    withStatus(status: MachineType.Input['status']): this;
    build(): MachineType.Input;
    static getSuccess(): MachineType.Input;
    static getMultiple(count?: number): MachineType.Input[];
    static getPaginatedCriteria(): Criteria.Paginated;
    static getRelationsCriteria(): string[];
    static getSelect(): string[];
    static getSearchFields(): string[];
    static getOrder(): Record<string, string>;
    static getRepositoryResponse(): {
        count: number;
        limit: number;
        offset: number;
        data: MachineType.Input[];
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
