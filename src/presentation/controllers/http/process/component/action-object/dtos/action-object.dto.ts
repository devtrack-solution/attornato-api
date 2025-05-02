import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'



export class ActionObjectDto extends BasicDto {
  @ApiProperty({ description: 'The name of the action-object', example: 'Administrativo', required: true })
  name!: string
}
