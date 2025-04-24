import { OmitType } from '@nestjs/swagger';
import { CreateIndividualDto } from './create-individual.dto';
import { IndividualType } from '@/domain/client/individual/types/individual.type';

export class PatchIndividualDto extends OmitType(CreateIndividualDto, []) implements Partial<IndividualType.Input> {}
