import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'



export class ProfileDto extends BasicDto {
  @ApiProperty({ description: 'The name of the practice-area', example: 'Administrativo', required: true })
  name!: string
}
