import { ApiProperty } from '@nestjs/swagger'
import { ClientDto } from '@/presentation/controllers/http/client/dtos/client.dto'

export class LegalDto extends ClientDto {
  @ApiProperty({ example: 'Carlos' })
  responsible!: string

  @ApiProperty({ example: 'Empresa XYZ' })
  companyName!: string

  @ApiProperty({ example: 'XYZ LTDA' })
  tradeName!: string

  @ApiProperty({ example: 'Tecnologia' })
  businessArea!: string

  @ApiProperty({ example: '12.345.678/0001-99' })
  cnpj!: string

  @ApiProperty({ example: '123456789' })
  stateRegistration!: string

  @ApiProperty({ example: '987654321' })
  municipalRegistration!: string
}
