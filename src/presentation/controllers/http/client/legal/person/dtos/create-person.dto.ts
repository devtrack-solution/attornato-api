import { PersonType } from '@/domain/client/legal/person/types/person.type';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import { LegalPersonDto } from './person.dto';
import { CreateContactPersonDto } from '../contact-person/dtos/create-contact-person.dto';
import { CreateCommunicationAddressDto } from '../communication-address/dtos/create-communication-address.dto';

export class CreatePersonDto extends OmitType(LegalPersonDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'] as const) implements PersonType.Input {
  @ApiProperty({ type: CreateCommunicationAddressDto })
  override communicationAddress!: CreateCommunicationAddressDto

  @ApiProperty({ type: CreateContactPersonDto })
  override contactPerson!: CreateContactPersonDto
}
