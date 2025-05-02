import { OmitType } from '@nestjs/swagger';
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'
import { CreateFreeFieldDto } from '@/presentation/controllers/http/client/person/contact-person/free-field/dtos/create-free-field.dto'

export class PatchFreeFieldDto extends OmitType(CreateFreeFieldDto, []) implements Partial<FreeFieldType.Input> {}
