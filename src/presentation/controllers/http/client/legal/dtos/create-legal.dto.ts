import { LegalType } from '@/domain/client/legal/types/legal.type';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import { LegalDto } from './legal.dto';
import { CreatePersonDto } from '../person/dtos/create-person.dto';

export class CreateLegalDto extends OmitType(LegalDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'] as const) implements LegalType.Input {
  @ApiProperty({ type: CreatePersonDto })
  override person!: CreatePersonDto
}
