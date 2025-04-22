import { OmitType } from '@nestjs/swagger';
import { CreateCommunicationAddressDto } from './create-communication-address.dto';
import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type';

export class PatchCommunicationAddressDto extends OmitType(CreateCommunicationAddressDto, []) implements Partial<CommunicationAddressType.Input> {}
