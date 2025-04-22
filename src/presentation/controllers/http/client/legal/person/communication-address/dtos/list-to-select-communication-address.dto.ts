import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type';
import { OmitType } from '@nestjs/swagger';
import { CreateCommunicationAddressDto } from './create-communication-address.dto';


export class ListToSelectCommunicationAddressDto
  extends OmitType(CreateCommunicationAddressDto, [])

  implements Partial<CommunicationAddressType.Input> {}
