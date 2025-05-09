import { OmitType } from '@nestjs/swagger'
import { AccountPersonDto } from '@/presentation/controllers/http/account/component/account-person/dtos/account-person.dto'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export class CreateAccountPersonDto extends OmitType(AccountPersonDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements AccountPersonType.Input {}
