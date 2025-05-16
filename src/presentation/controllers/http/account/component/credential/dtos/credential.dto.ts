import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class CredentialDto extends BasicDto {
  @ApiProperty({ required: true })
  username!: string
}
