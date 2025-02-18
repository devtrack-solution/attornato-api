import { ApiProperty } from '@nestjs/swagger'
import { MachineType } from '@/domain/machine/types/machine.type'

export class CreateMachineDto implements MachineType.Input {
  @ApiProperty({ description: 'The name of the machine', example: 'Laser Cutter', required: true })
  name!: string

  @ApiProperty({ description: 'A short description of the machine', example: 'High precision laser cutting machine', required: true })
  description!: string

  @ApiProperty({ description: 'The machine Code', example: 'IM12345S001', required: true })
  machineCode!: string

  /*  @ApiProperty({ description: 'The machine group ID', example: '123e4567-e89b-12d3-a456-426614174000', required: true })
  machineGroupId!: string*/

  @ApiProperty({ description: 'The current status of the machine', example: 'Available', required: true })
  status!: string

  /*  @ApiProperty({ description: 'Technical specifications of the machine', required: true })
  technicalSpecification!: MachineType.Input['technicalSpecification']

  @ApiProperty({ description: 'Machine location', required: true })
  location!: MachineType.Input['location']

  @ApiProperty({ description: 'Production capacity details', required: true })
  productionCapacity!: MachineType.Input['productionCapacity']

  @ApiProperty({ description: 'List of operators assigned to this machine', required: true })
  operators!: MachineType.Input['operators']

  @ApiProperty({ description: 'Maintenance history', required: true })
  maintenances!: MachineType.Input['maintenances']*/
}
