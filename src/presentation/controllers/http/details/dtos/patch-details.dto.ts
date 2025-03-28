import { OmitType } from '@nestjs/swagger';
import { CreateDetailsDto } from './create-details.dto';
import { DetailsType } from '@/domain/details/types/details.type'

export class PatchDetailsDto extends OmitType(CreateDetailsDto, []) implements Partial<DetailsType.Input> {}
