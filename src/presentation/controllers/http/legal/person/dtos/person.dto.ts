import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import {
  ContactPersonLegalDto
} from '@/presentation/controllers/http/legal/person/contact-person-legal/dtos/contact-person-legal.dto'
import {
  CommunicationAddressDto
} from '@/presentation/controllers/http/legal/person/communication-address/dtos/communication-address.dto'

export class PersonDto extends BasicDto {
  @ApiProperty()
  clientId!: string

  @ApiProperty({ type: CommunicationAddressDto })
  communicationAddress!: CommunicationAddressDto

  @ApiProperty({ type: ContactPersonLegalDto })
  contactPersonLegal!: ContactPersonLegalDto
}
