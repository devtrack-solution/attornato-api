import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { ContactDto } from '@/presentation/controllers/http/client/individual/person/communication-address/contact/dtos/contact.dto'

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

  @ApiProperty({ type: [ContactDto] })
  contacts!: ContactDto[]
}
