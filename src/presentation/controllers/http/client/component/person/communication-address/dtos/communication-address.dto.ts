import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateContactDto } from '@/presentation/controllers/http/client/component/person/communication-address/contact/dtos/create-contact.dto'

export class CommunicationAddressDto extends BasicDto {
  @ApiProperty()
  zipCode!: string

  @ApiProperty()
  street!: string

  @ApiProperty()
  neighborhood!: string

  @ApiProperty()
  city!: string

  @ApiProperty()
  state!: string

  @ApiProperty({ type: [CreateContactDto] })
  contacts!: CreateContactDto[]
}
