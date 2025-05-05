import { LegalType } from '@/domain/client/component/legal/types/legal.type';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import { CreatePersonDto } from '@/presentation/controllers/http/client/component/person/dtos/create-person.dto'
import { LegalDto } from '@/presentation/controllers/http/client/component/legal/dtos/legal.dto'

export class CreateLegalDto extends OmitType(LegalDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'] as const) implements LegalType.Input {
  @ApiProperty({ type: CreatePersonDto })
  override person!: CreatePersonDto
}
