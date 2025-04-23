import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CommunicationAddressDto } from '@/presentation/controllers/http/client/legal/person/communication-address/dtos/communication-address.dto'
import { ContactPersonDto } from '@/presentation/controllers/http/client/legal/person/contact-person/dtos/contact-person.dto'

export class PersonDto extends BasicDto {
  @ApiProperty()
  clientId!: string

  @ApiProperty({ type: CommunicationAddressDto })
  communicationAddress!: CommunicationAddressDto

  @ApiProperty({ type: ContactPersonDto })
  contactPerson!: ContactPersonDto
}
