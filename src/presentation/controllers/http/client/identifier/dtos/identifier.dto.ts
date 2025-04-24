import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export enum ClientCategoryEnum {
  PERSON = 'PF',
  COMPANY = 'PJ'
}

export class IdentifierDto extends BasicDto {
  @ApiProperty({
    description: 'Type of client: PF (Pessoa Física) or PJ (Pessoa Jurídica)',
    enum: ClientCategoryEnum,
    example: ClientCategoryEnum.PERSON,
    required: true,
  })
  clientCategory!: ClientCategoryEnum

  value!: number
}
