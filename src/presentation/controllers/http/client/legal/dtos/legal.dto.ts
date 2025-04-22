import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { ProfileDto } from '@/presentation/controllers/http/profile/dtos/profile.dto'
import { GroupCustomerDto } from '@/presentation/controllers/http/group-customer/dtos/group-customer.dto'
import { PersonDto } from '@/presentation/controllers/http/client/legal/person/dtos/person.dto'

export class LegalDto extends BasicDto {
  @ApiProperty({ type: GroupCustomerDto })
  groupCustomer!: GroupCustomerDto

  @ApiProperty({ type: ProfileDto })
  profile!: ProfileDto

  @ApiProperty({ type: PersonDto })
  person!: PersonDto

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
