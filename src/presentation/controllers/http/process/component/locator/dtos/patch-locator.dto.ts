import { OmitType } from '@nestjs/swagger';
import { CreateLocatorDto } from './create-locator.dto';
import { LocatorType } from '@/domain/process/component/locator/types/locator.type';

export class PatchLocatorDto extends OmitType(CreateLocatorDto, []) implements Partial<LocatorType.Input> {}
