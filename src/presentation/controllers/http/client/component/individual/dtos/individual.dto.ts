import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateGroupCustomerDto } from '@/presentation/controllers/http/client/component/group-customer/dtos/create-group-customer.dto'
import { CreateProfileDto } from '@/presentation/controllers/http/client/component/profile/dtos/create-profile.dto'
import { CreatePersonDto } from '@/presentation/controllers/http/client/component/person/dtos/create-person.dto'
import { ClientDto } from '@/presentation/controllers/http/client/dtos/client.dto'

export class IndividualDto extends ClientDto {
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

