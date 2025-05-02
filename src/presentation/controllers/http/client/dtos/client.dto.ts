import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateProfileDto } from '@/presentation/controllers/http/client/profile/dtos/create-profile.dto'
import { CreatePersonDto } from '@/presentation/controllers/http/client/person/dtos/create-person.dto'
import { CreateGroupCustomerDto } from '@/presentation/controllers/http/client/group-customer/dtos/create-group-customer.dto'

export class ClientDto extends BasicDto {
  @ApiProperty({ type: CreateGroupCustomerDto })
  groupCustomer!: CreateGroupCustomerDto

  @ApiProperty({ type: CreateProfileDto })
  profile!: CreateProfileDto

  @ApiProperty({ type: CreatePersonDto })
  person!: CreatePersonDto
}
