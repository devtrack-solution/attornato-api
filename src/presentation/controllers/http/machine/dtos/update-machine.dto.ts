import { ApiProperty } from '@nestjs/swagger'
import { MachineType } from '@/domain/machine/types/machine.type'

export class UpdateMachineDto implements Partial<MachineType.Input> {
  @ApiProperty({ description: 'A short description of the machine', example: 'Updated machine description', required: false })
  description?: string

  @ApiProperty({ description: 'The current status of the machine', example: 'In maintenance', required: false })
  status?: string

  /*  @ApiProperty({ description: 'Updated technical specifications of the machine', required: false })
  technicalSpecification?: MachineType.Input['technicalSpecification']

  @ApiProperty({ description: 'Updated location of the machine', required: false })
  location?: MachineType.Input['location']

  @ApiProperty({ description: 'Updated production capacity details', required: false })
  productionCapacity?: MachineType.Input['productionCapacity']

  @ApiProperty({ description: 'Updated list of assigned operators', required: false })
  operators?: MachineType.Input['operators']

  @ApiProperty({ description: 'Updated maintenance history', required: false })
  maintenances?: MachineType.Input['maintenances']*/
}
