import { MachineType } from '@/domain/machine/types/machine.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export class MachineTestBuilder {
  private machine: Partial<MachineType.Input> = {
    name: 'Laser Cutter',
    description: 'High precision laser cutting machine',
    machineCode: 'IM12345S001',
    // machineGroupId: 'group-id',
    status: 'AVAILABLE',
    /*technicalSpecification: {
      manufacturer: 'LaserTech',
      manufactureYear: 2022,
      model: 'LT-5000',
      serialNumber: 'SN123456',
      requiredAreaM2: 10,
      acquisitionAt: '2023-01-15',
      acquisitionValue: 50000,
      depreciatedMarketValue: 30000,
      usefulLife: 10,
      energyConsumption: 500,
      equipmentCategory: {
        name: 'Printer',
        description: '',
        alias: 'IM',
      },
      manuals: [{ link: 'https://xyz.com', description: 'User Manual' }],
    },
    location: {
      site: 'Main Factory',
      floor: 'Ground',
      column: 1,
      row: 2,
    },
    productionCapacity: {
      units: 1000,
      linearMeters: 500,
    },
    operators: [{ name: 'John Doe', operatorType: 'Technician' }],
    maintenances: [],*/
  }

  static create(): MachineTestBuilder {
    return new MachineTestBuilder()
  }

  withName(name: string): this {
    this.machine.name = name
    return this
  }

  withMachineCode(code: string): this {
    this.machine.machineCode = code
    return this
  }

  withStatus(status: MachineType.Input['status']): this {
    this.machine.status = status
    return this
  }

  build(): MachineType.Input {
    return this.machine as MachineType.Input
  }

  static getSuccess(): MachineType.Input {
    return MachineTestBuilder.create().build()
  }

  static getMultiple(count: number = 3): MachineType.Input[] {
    return Array.from({ length: count }, (_, i) =>
      MachineTestBuilder.create()
        .withName(`Machine ${i + 1}`)
        .withMachineCode(`CODE-${i + 1}`)
        .build(),
    )
  }

  // 🔹 Standardized pagination criteria
  static getPaginatedCriteria(): Criteria.Paginated {
    return { limit: 10, offset: 0, search: '' }
  }

  // 🔹 Standardized relations criteria for this entity
  static getRelationsCriteria(): string[] {
    return ['technicalSpecification', 'technicalSpecification.manuals']
  }

  static getSelect(): string[] {
    return []
  }

  static getSearchFields(): string[] {
    return ['name', 'description']
  }

  static getOrder(): Record<string, string> {
    return  {"createdAt": "ASC"}
  }

  // 🔹 Mocked repository response (with multiple machines)
  static getRepositoryResponse(): { count: number; limit: number; offset: number; data: MachineType.Input[] } {
    const mockMachines = MachineTestBuilder.getMultiple(3)
    return {
      count: 3,
      limit: 10,
      offset: 0,
      data: mockMachines,
    }
  }

  // 🔹 Expected formatted output for service test assertions
  static getExpectedOutput(): { count: number; limit: number; offset: number; data: object[] } {
    return {
      count: 3,
      limit: 10,
      offset: 0,
      data: expect.arrayContaining([
        expect.objectContaining({ name: 'Machine 1', machineCode: 'CODE-1' }),
        expect.objectContaining({ name: 'Machine 2', machineCode: 'CODE-2' }),
        expect.objectContaining({ name: 'Machine 3', machineCode: 'CODE-3' }),
      ]),
    }
  }

  // 🔹 Empty response for no machines found
  static getEmptyResponse(): { count: number; limit: number; offset: number; data: [] } {
    return { count: 0, limit: 10, offset: 0, data: [] }
  }
}
