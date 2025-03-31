import { OmitType } from '@nestjs/swagger';
import { CreateContactTypeDto } from '@/presentation/controllers/http/contact-type/dtos/create-contact-type.dto'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'

export class PatchContactTypeDto extends OmitType(CreateContactTypeDto, []) implements Partial<ContactTypeType.Input> {}
