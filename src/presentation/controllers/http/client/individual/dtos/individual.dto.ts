import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { ProfileDto } from '@/presentation/controllers/http/profile/dtos/profile.dto'
import { GroupCustomerDto } from '@/presentation/controllers/http/group-customer/dtos/group-customer.dto'
import { PersonDto } from '@/presentation/controllers/http/client/individual/person/dtos/person.dto'

export class IndividualDto extends BasicDto {
  @ApiProperty({ type: GroupCustomerDto })
  groupCustomer!: GroupCustomerDto

  @ApiProperty({ type: ProfileDto })
  profile!: ProfileDto

  @ApiProperty({ type: PersonDto })
  person!: PersonDto

  @ApiProperty({ example: 'João da Silva' })
  name!: string

  @ApiProperty({ example: 'Brasileira' })
  nationality!: string

  @ApiProperty({ example: 'Engenheiro de Software' })
  occupation!: string

  @ApiProperty({ example: 'Superior Completo' })
  educationLevel!: string

  @ApiProperty({ example: 'Solteiro' })
  maritalStatus!: string

  @ApiProperty({ example: '1990-05-20' })
  birthDate!: Date

  @ApiProperty({ example: '123.456.789-00' })
  cpf!: string

  @ApiProperty({ example: 'MG-12.345.678' })
  rg!: string

  @ApiProperty({ example: '123.45678.90-0' })
  pis!: string
}

