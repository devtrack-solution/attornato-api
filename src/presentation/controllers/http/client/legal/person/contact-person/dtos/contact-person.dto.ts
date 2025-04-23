import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { FreeFieldDto } from '@/presentation/controllers/http/free-field/dtos/free-field.dto'

export class ContactPersonDto extends BasicDto {
  @ApiProperty()
  freeFieldOne!: string

  @ApiProperty()
  note!: string

  @ApiProperty({ type: FreeFieldDto })
  freeField!: FreeFieldDto
}
