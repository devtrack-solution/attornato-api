import { LocatorType } from '@/domain/process/component/locator/types/locator.type';
import { OmitType } from '@nestjs/swagger';
import { LocatorDto } from './locator.dto';

export class CreateLocatorDto
  extends OmitType(LocatorDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements LocatorType.Input {}
