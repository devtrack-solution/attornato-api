import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class MachineGroupDto extends BasicDto {
  @ApiProperty({ description: 'Name of the machine group', example: 'Heavy Excavators', required: true })
  groupName!: string

  @ApiProperty({ description: 'Slug for the machine group', example: 'heavy-excavators', required: true })
  slug!: string

  @ApiProperty({ description: 'Unique group code', example: 'TEX1234S1', required: true })
  groupCode!: string
}
