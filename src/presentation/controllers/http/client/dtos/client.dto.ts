import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateProfileDto } from '@/presentation/controllers/http/client/component/profile/dtos/create-profile.dto'
import { CreatePersonDto } from '@/presentation/controllers/http/client/component/person/dtos/create-person.dto'
import { CreateGroupCustomerDto } from '@/presentation/controllers/http/client/component/group-customer/dtos/create-group-customer.dto'

export class ClientDto extends BasicDto {
  @ApiPropertyOptional({ type: CreateGroupCustomerDto })
  groupCustomer?: CreateGroupCustomerDto

  @ApiProperty()
  groupCustomerId!: string

  @ApiPropertyOptional({ type: CreateProfileDto })
  profile?: CreateProfileDto

  @ApiProperty()
  profileId!: string

  @ApiProperty({ type: CreatePersonDto })
  person!: CreatePersonDto
}
