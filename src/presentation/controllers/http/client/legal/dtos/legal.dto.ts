import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateGroupCustomerDto } from '@/presentation/controllers/http/client/group-customer/dtos/create-group-customer.dto'
import { CreateProfileDto } from '@/presentation/controllers/http/client/profile/dtos/create-profile.dto'
import { CreatePersonDto } from '@/presentation/controllers/http/client/person/dtos/create-person.dto'

export class LegalDto extends BasicDto {
  @ApiProperty({ type: CreateGroupCustomerDto })
  groupCustomer!: CreateGroupCustomerDto

  @ApiProperty({ type: CreateProfileDto })
  profile!: CreateProfileDto

  @ApiProperty({ type: CreatePersonDto })
  person!: CreatePersonDto

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
