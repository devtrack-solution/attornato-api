import { OmitType } from '@nestjs/swagger';
import { DetailsDto } from './details.dto';
import { DetailsType } from '@/domain/details/types/details.type'

export class CreateDetailsDto
  extends OmitType(DetailsDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements DetailsType.Input {}
