import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import { CommunicationAddressDto } from './communication-address.dto';
import { CreateContactDto } from '../contact/dtos/create-contact.dto';

export class CreateCommunicationAddressDto
  extends OmitType(
    CommunicationAddressDto,
    [
      'id',
      'userId',
      'lastUpdatedUserId',
      'createdUserId',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'enable',
    ] as const,
  )
  implements CommunicationAddressType.Input {
  @ApiProperty({ type: CreateContactDto, isArray: true })
  contacts!: CreateContactDto[];
}
