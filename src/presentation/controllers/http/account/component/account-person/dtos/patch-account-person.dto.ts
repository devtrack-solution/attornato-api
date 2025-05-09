import { OmitType } from '@nestjs/swagger'
import { CreateAccountPersonDto } from '@/presentation/controllers/http/account/component/account-person/dtos/create-account-person.dto'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export class PatchAccountPersonDto extends OmitType(CreateAccountPersonDto, []) implements Partial<AccountPersonType.Input> {}
