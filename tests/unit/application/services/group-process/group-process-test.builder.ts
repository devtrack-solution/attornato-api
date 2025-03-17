import { GroupProcessType } from '@/domain/group-process/types/group-process.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export class GroupProcessTestBuilder {
  private groupProcess: Partial<GroupProcessType.Input> = {
    name: 'Administrativo',
    
  }

  static create(): GroupProcessTestBuilder {
    return new GroupProcessTestBuilder()
  }

  withName(name: string): this {
    this.groupProcess.name = name
    return this
  }

  build(): GroupProcessType.Input {
    return this.groupProcess as GroupProcessType.Input
  }

  static getSuccess(): GroupProcessType.Input {
    return GroupProcessTestBuilder.create().build()
  }

  static getMultiple(count: number = 3): GroupProcessType.Input[] {
    return Array.from({ length: count }, (_, i) =>
      GroupProcessTestBuilder.create()
        .withName(`GroupProcess ${i + 1}`)
        .build(),
    )
  }

  // 🔹 Standardized pagination criteria
  static getPaginatedCriteria(): Criteria.Paginated {
    return { limit: 10, offset: 0, search: '' }
  }

  // 🔹 Standardized relations criteria for this entity
  static getRelationsCriteria(): string[] {
    return []
  }

  static getSelect(): string[] {
    return ['id', 'name', 'createdAt']
  }

  static getSearchFields(): string[] {
    return ['name']
  }

  static getOrder(): Record<string, string> {
    return  {"createdAt": "ASC"}
  }

  // 🔹 Mocked repository response (with multiple machines)
  static getRepositoryResponse(): { count: number; limit: number; offset: number; data: GroupProcessType.Input[] } {
    const mockGroupProcesss = GroupProcessTestBuilder.getMultiple(3)
    return {
      count: 3,
      limit: 10,
      offset: 0,
      data: mockGroupProcesss,
    }
  }

  // 🔹 Expected formatted output for service test assertions
  static getExpectedOutput(): { count: number; limit: number; offset: number; data: object[] } {
    return {
      count: 3,
      limit: 10,
      offset: 0,
      data: expect.arrayContaining([
        expect.objectContaining({ name: 'GroupProcess 1' }),
        expect.objectContaining({ name: 'GroupProcess 2' }),
        expect.objectContaining({ name: 'GroupProcess 3' }),
      ]),
    }
  }

  // 🔹 Empty response for no machines found
  static getEmptyResponse(): { count: number; limit: number; offset: number; data: [] } {
    return { count: 0, limit: 10, offset: 0, data: [] }
  }
}
