import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateContactPersonDto } from '@/presentation/controllers/http/client/person/contact-person/dtos/create-contact-person.dto'
import { CreateCommunicationAddressDto } from '@/presentation/controllers/http/client/person/communication-address/dtos/create-communication-address.dto'

export class PersonDto extends BasicDto {
  @ApiProperty()
  clientId!: string

  @ApiProperty({ type: CreateCommunicationAddressDto })
  communicationAddress!: CreateCommunicationAddressDto

  @ApiProperty({ type: CreateContactPersonDto })
  contactPerson!: CreateContactPersonDto
}
