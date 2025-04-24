import { IndividualType } from '@/domain/client/individual/types/individual.type';
import { OmitType } from '@nestjs/swagger';
import { CreateIndividualDto } from './create-individual.dto';


export class ListToSelectIndividualDto
  extends OmitType(CreateIndividualDto, [])

  implements Partial<IndividualType.Input> {}
