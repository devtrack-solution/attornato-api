import { ApiProperty } from '@nestjs/swagger'

import { TechnicalSpecificationDto } from '@/presentation/controllers/http/machine/dtos/technical-specification.dto'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export enum MachineStatus {
  MAINTENANCE = 'Em manutenção',
  STOPPED = 'Parada',
  ADJUSTMENTS = 'Ajustes',
  TESTING = 'Em testes',
  AWAITING_MAINTENANCE = 'Aguardando manutenção',
  AVAILABLE = 'Disponível',
  PREPARING = 'Em preparação',
  INACTIVE = 'Inativa',
}


export class MachineDto extends BasicDto {
  @ApiProperty({ description: 'The name of the machine', example: 'Laser Cutter', required: true })
  name!: string

  @ApiProperty({ description: 'A short description of the machine', example: 'High precision laser cutting machine', required: true })
  description!: string

  @ApiProperty({ description: 'The machine Code', example: 'IM12345S001', required: true })
  machineCode!: string

  /*  @ApiProperty({ description: 'The machine group ID', example: '123e4567-e89b-12d3-a456-426614174000', required: true })
  machineGroupId!: string*/

  @ApiProperty({
    description: 'The current status of the machine',
    example: MachineStatus.AVAILABLE,
    enum: MachineStatus,
    required: true,
  })
  status!: MachineStatus;


  @ApiProperty({ description: 'Technical specifications of the machine', required: false })
  technicalSpecification!: TechnicalSpecificationDto

  /* @ApiProperty({ description: 'Machine location', required: true })
  location!: MachineType.Input['location']

  @ApiProperty({ description: 'Production capacity details', required: true })
  productionCapacity!: MachineType.Input['productionCapacity']

  @ApiProperty({ description: 'List of operators assigned to this machine', required: true })
  operators!: MachineType.Input['operators']

  @ApiProperty({ description: 'Maintenance history', required: true })
  maintenances!: MachineType.Input['maintenances']*/
}
