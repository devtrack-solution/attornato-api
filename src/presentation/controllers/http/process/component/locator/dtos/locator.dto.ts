import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'



export class LocatorDto extends BasicDto {
  @ApiProperty({ description: 'The name of the locator', example: 'Administrativo', required: true })
  name!: string
}
